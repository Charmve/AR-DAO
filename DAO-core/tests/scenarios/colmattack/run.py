# Big thanks to @colm from our slack chat for thinking of this attack !!!
scenario_description = (
    "Before commit 842ce13aedca6365d1f6f4b62c215d4e9b265ffa an attacker could "
    "create a proposal with a huge deposit. Then he could create a split DAO "
    "proposal to get his share of ether plus his share of the deposit he gave."
    " Then if the original proposal meets the quorum the attacker will also "
    "get his deposit back."
)


def run(ctx):
    ctx.assert_scenario_ran('fuel')

    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "offer_address": ctx.offer_address,
        "attack_debating_period": ctx.args.colmattack_attack_debate_secs,
        "split_debating_period": ctx.args.colmattack_split_debate_secs,
        "attack_deposit": ctx.args.colmattack_attack_deposit,
    })

    ctx.execute(expected={
        "attacker_eth_balance_diff": 0,
        "attacker_dao_balance_diff": 0,
        "split_dao_total_supply": ctx.token_amounts[2]
    })
