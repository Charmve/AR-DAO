from utils import arr_str, create_votes_array


scenario_description = (
    " Testing an equal split, with a new Curator. Half of the token holders "
    "vote for a split to a new DAO and half vote to stay with the old one. "
    "Assert that the split happens, a new DAO is created and that the tokens "
    "are burned from the old DAO and moved to the new DAO succesfully. Also "
    "assert that the reward tokens are succesfully transferred"
)


def tokens_after_split(votes, original_balance, dao_balance, reward_tokens):
    """
    Create expected token and reward token results after the split scenario
        Parameters
        ----------
        votes : array of booleans
        The votes array of what each user voted

        original_balance : array of ints
        The original amount of tokens each user had before the split

        dao_balance : int
        The balance of ether left in the DAO before the scenario started

        reward_tokens : float
        Amount of reward tokens generated in the DAO before the scenario.

        Returns
        ----------
        old_dao_balance : array of ints
        The balance of tokens left in the old dao.

        new_dao_balance : array of ints
        The balance of tokens left in the new dao.

        old_reward_tokens : float
        The amount of reward tokens left in the old dao.

        new_reward_tokens : float
        The amount of reward tokens left in the new dao.
    """

    old_dao_balance = []
    new_dao_balance = []
    totalSupply = sum(original_balance)
    old_reward_tokens = reward_tokens
    new_reward_tokens = 0

    for vote, orig in zip(votes, original_balance):
        if vote:
            new_dao_balance.append(orig * dao_balance / float(totalSupply))
            old_dao_balance.append(0)
            rewardToMove = float(orig) * reward_tokens / float(totalSupply)
            old_reward_tokens -= float(rewardToMove)
            new_reward_tokens += float(rewardToMove)
        else:
            old_dao_balance.append(orig)
            new_dao_balance.append(0)
    return (
        old_dao_balance,
        new_dao_balance,
        old_reward_tokens,
        new_reward_tokens
    )


def prepare_test_split(ctx, split_gas):
    ctx.assert_scenario_ran('rewards')

    votes = create_votes_array(
        ctx.token_amounts,
        not ctx.args.proposal_fail,
        True
    )
    # remember the account information of the first True votes. They will be
    # the child dao curator in this scenario and grandchild curator in the next
    iterator = (
        (ctx.accounts[i], ctx.token_amounts[i])
        for i, vote in enumerate(votes) if vote is True
    )
    (ctx.child_dao_curator, _) = next(iterator)
    (ctx.grandchild_dao_curator, ctx.grandchild_dao_curator_before) = next(iterator)
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "debating_period": ctx.args.split_debate_seconds,
        "split_execution_period": ctx.args.split_execution_period,
        "split_gas": split_gas,
        "votes": arr_str(votes),
        "child_dao_curator": ctx.child_dao_curator
        }
    )
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.split_debate_seconds)
    )
    return votes


def run(ctx):
    # Use the split_gas variable to test that splitting with insufficient gas,
    # will fail reliably and will not leave an empty contract in the state,
    # burning away user tokens in the process.
    # This should happen with the latest homestead changes:
    # https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2.mediawiki#specification
    split_gas = 4700000

    votes = prepare_test_split(ctx, split_gas)
    oldBalance, newBalance, oldDAORewards, newDAORewards = tokens_after_split(
        votes,
        ctx.token_amounts,
        ctx.dao_balance_after_rewards,
        ctx.dao_rewardToken_after_rewards
    )

    results = ctx.execute(expected={
        "newDAOProposalDeposit": 0,
        "oldDAOBalance": oldBalance,
        "newDAOBalance": newBalance,
        "oldDaoRewardTokens": oldDAORewards,
        "newDaoRewardTokens": newDAORewards
    })

    # remember some variables so they can be used in later tests
    ctx.child_dao_closing_time = results['new_dao_closing_time']
    ctx.child_dao_address = results['proposal_newdao']
    ctx.child_dao_members = [
        ctx.accounts[idx] for idx, x in enumerate(votes) if x is True
    ]
    ctx.child_dao_balance_at_creation = results['new_dao_balance']
    ctx.child_dao_total_supply_at_creation = results['new_dao_total_supply']
