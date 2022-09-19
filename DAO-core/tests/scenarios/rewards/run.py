from utils import calculate_bytecode

scenario_description = (
    " A kind soul donates to the DAO so the DAO has rewards for distribution. "
    "Create a proposal to send the rewards to the RewardsAccount, vote and "
    "execute it. Subsequently claim rewards and assert that they are "
    "proportional to the tokens held by the account claiming the reward."
)


def calculate_reward(tokens, total_tokens, total_rewards):
    result = (tokens * float(total_rewards)) / float(total_tokens)
    return result


def run(ctx):
    ctx.assert_scenario_ran('proposal')

    bytecode = calculate_bytecode('retrieveDAOReward', ("bool", True))
    ctx.create_js_file(substitutions={
            "dao_abi": ctx.dao_abi,
            "dao_address": ctx.dao_address,
            "total_rewards": ctx.args.rewards_total_amount,
            "proposal_deposit": ctx.args.proposal_deposit,
            "transaction_bytecode": bytecode,
            "debating_period": ctx.args.proposal_debate_seconds
        }
    )
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.proposal_debate_seconds)
    )

    results = ctx.execute(expected={
        "curator_reward_portion": calculate_reward(
            ctx.token_amounts[0],
            ctx.total_supply,
            ctx.args.rewards_total_amount)
    })
    ctx.dao_balance_after_rewards = results['DAO_balance']
    ctx.dao_rewardToken_after_rewards = results['DAO_rewardToken']
