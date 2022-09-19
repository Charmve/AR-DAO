from utils import calculate_bytecode, to_wei

scenario_description = (
    "The DAO spent all its money and has to resort to retrieving money from "
    "the extra balance account. In the meantime a bad guy tries to pass a "
    "proposal to send all of the extraBalance money to himself. Assert that "
    "this is impossible."
)


def run(ctx):
    ctx.assert_scenario_ran('spendall')
    attacker_address = ctx.accounts[3]
    bytecode = calculate_bytecode(
        'payOut',
        ('address', attacker_address),
        ('uint256', to_wei(5))
    )
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "attacker_address": attacker_address,
        "proposal_deposit": ctx.args.proposal_deposit,
        "debating_period": ctx.args.proposal_debate_seconds,
        "transaction_bytecode": bytecode
    })

    ctx.execute(expected={
        "extra_balance_diff_after_attack": 0
    })
