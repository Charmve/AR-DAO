from utils import calculate_bytecode

scenario_description = (
    "Work on a PFOFfer contract with a very big vote status deadline which "
    "will guarantee failure of the checkVoteStatus() call due to the "
    "aforementioned deadline. Check that the failure indeed happens."
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

    ctx.execute(expected={
        "proposal_succesfully_watched": True,
        "approved_before_deadline": False,
    })
