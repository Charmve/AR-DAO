from utils import calculate_bytecode, create_votes_array_for_quorum, arr_str

scenario_description = (
    """A test of the DAO contract upgrade where the proposal's quorum ends up
    being insufficient (<53.3%) and the proposal gets rejected.
    """
)


def run(ctx):
    ctx.assert_scenario_ran('fuel')

    votes = create_votes_array_for_quorum(ctx.token_amounts, 0.4, True, False)
    # let's just use an existing account
    newAddress = ctx.accounts[4]
    bytecode = calculate_bytecode('newContract', ("address", newAddress))
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "new_contract_address": newAddress,
        "proposal_deposit": ctx.args.proposal_deposit,
        "votes": arr_str(votes),
        "transaction_bytecode": bytecode,
        "debating_period": ctx.args.proposal_debate_seconds
    })
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.proposal_debate_seconds)
    )

    ctx.execute(expected={
        "new_contract_balance": 0,
        "dao_balance_diff": 0
    })
