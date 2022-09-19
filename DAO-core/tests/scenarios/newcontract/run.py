from utils import calculate_bytecode

scenario_description = (
    """A test of the DAO contract upgrade. We create a new contract with a
    completely different code and vote to transfer everything to the new
    contract.
    """
)


def run(ctx):
    ctx.assert_scenario_ran('rewards')

    # let's just use an existing account
    newAddress = ctx.accounts[4]
    bytecode = calculate_bytecode('newContract', ('address', ctx.accounts[4]))
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "new_contract_address": newAddress,
        "proposal_deposit": ctx.args.proposal_deposit,
        "transaction_bytecode": bytecode,
        "debating_period": ctx.args.proposal_debate_seconds
    })
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.proposal_debate_seconds)
    )

    ctx.execute(expected={
        "dao_balance_after": 0,
        "money_transferred": True,
        "reward_tokens_transferred": True
    })
