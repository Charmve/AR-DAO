from utils import calculate_bytecode, to_wei

scenario_description = (
    "The DAO spent all its money and has to resort to retrieving money from "
    "the extra balance account. This test checks that this is succesful."
)


def run(ctx):
    ctx.assert_scenario_ran('spendall')
    extra_balance_ether_to_get = 5
    bytecode = calculate_bytecode(
        'payOut',
        ('address', ctx.dao_address),
        ('uint256', to_wei(extra_balance_ether_to_get))
    )
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "proposal_deposit": ctx.args.proposal_deposit,
        "debating_period": ctx.args.proposal_debate_seconds,
        "transaction_bytecode": bytecode
    })

    ctx.execute(expected={
        "dao_balance_diff_after_claim": extra_balance_ether_to_get
    })
