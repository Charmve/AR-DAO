from utils import calculate_bytecode

scenario_description = (
    "Make a proposal to sign the PFOFfer and make sure that no money is "
    "transferred during the signing of the proposal. Also assert that "
    "calling getDailyPayment immediately after signing and within the "
    "payoutFreezePeriod fails."
)


def run(ctx):
    ctx.assert_scenario_ran('fuel')
    bytecode = calculate_bytecode('sign')
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "pfoffer_abi": ctx.pfoffer_abi,
        "pfoffer_address": ctx.pfoffer_address,
        "offer_amount": ctx.args.deploy_total_costs,
        "proposal_deposit": ctx.args.proposal_deposit,
        "transaction_bytecode": bytecode,
        "debating_period": ctx.args.proposal_debate_seconds,
        "vote_status_deadline": ctx.args.deploy_pfoffer_vote_status_deadline
    })
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.proposal_debate_seconds)
    )

    ctx.execute(expected={
        "only_contractor_can_watch_proposal": True,
        "proposal_succesfully_watched": True,
        "approved_before_deadline": True,
        "no_money_at_sign": True,
        "contract_valid": True,
        "onetime_payment_failed": True
    })
