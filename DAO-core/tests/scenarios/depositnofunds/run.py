from utils import calculate_bytecode

scenario_description = (
    "After the DAO has spent all of its money, make a proposal to change "
    "the default proposal deposit, vote for it and then assure that the DAO's "
    "proposal deposit did indeed change. Effectively test that things work "
    "fine after commit: 92beee5d27f66793689448903872302d0f4a6287"
)


def run(ctx):
    ctx.assert_scenario_ran('spendall')

    bytecode = calculate_bytecode(
        'changeProposalDeposit',
        ('uint256', ctx.args.deposit_new_value)
    )
    ctx.create_js_file(substitutions={
            "dao_abi": ctx.dao_abi,
            "dao_address": ctx.dao_address,
            "proposal_deposit": ctx.args.proposal_deposit,
            "transaction_bytecode": bytecode,
            "debating_period": ctx.args.deposit_debate_seconds
        }
    )
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.proposal_debate_seconds)
    )

    ctx.execute(expected={
        "deposit_after_vote": ctx.args.deposit_new_value
    })
