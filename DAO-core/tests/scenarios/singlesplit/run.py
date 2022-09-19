scenario_description = (
    " An 'angry' user decides to get out of the DAO and take his money with "
    "him. He creates a proposal to split into an one-member DAO with himself "
    "as the Curator. Then he makes a proposal to this new DAO to "
    "transfer all of the money to himself. Assert that the money he gets back "
    "in the end is equal to the money he put in the original DAO."
)


def run(ctx):
    ctx.assert_scenario_ran('fuel')

    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "proposal_deposit": ctx.args.proposal_deposit,
        "debating_period": ctx.args.proposal_debate_seconds,
        "split_execution_period": ctx.args.split_execution_period
    })
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.proposal_debate_seconds)
    )

    ctx.execute(expected={
        "newdao_proposals_num": 1,
        "angry_user_profit": ctx.token_amounts[1] + ctx.args.proposal_deposit
    })
