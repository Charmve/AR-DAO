scenario_description = (
    "The DAO spends all its money. This scenario is but a pivot used "
    " by all the other scenarios that want to deal with extra balance."
)


def run(ctx):
    ctx.assert_scenario_ran('fuel')
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "proposal_deposit": ctx.args.proposal_deposit,
        "debating_period": ctx.args.proposal_debate_seconds,
    })

    ctx.execute(expected={
        "dao_total_balance_after_spend": 0
    })
