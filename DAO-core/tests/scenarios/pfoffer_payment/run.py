from utils import calculate_bytecode

scenario_description = (
    "Get the onetime payment from the PFOffer contract after the payoutFreeze "
    "period has passed."
)


def run(ctx):
    ctx.assert_scenario_ran('pfoffer')
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "pfoffer_abi": ctx.pfoffer_abi,
        "pfoffer_address": ctx.pfoffer_address,
        "offer_amount": ctx.args.deploy_total_costs,
        "expected_onetime": ctx.args.deploy_onetime_costs,
        "proposal_deposit": ctx.args.proposal_deposit,
        "debating_period": ctx.args.proposal_debate_seconds,
        "payout_freeze_period": ctx.args.deploy_pfoffer_payout_freeze_period
    })

    ctx.execute(expected={
        "one_time_paid": True,
        "one_time_costs_amount_as_expected": True
    })
