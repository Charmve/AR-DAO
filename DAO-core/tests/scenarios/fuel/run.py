import random
from utils import constrained_sum_sample_pos, arr_str


scenario_description = (
    "During the fueling period of the DAO, send enough ether from all "
    "accounts to create tokens and then assert that the user's balance is "
    "indeed correct and that the minimum fueling goal has been reached"
)


def run(ctx):
    ctx.assert_scenario_ran('deploy')

    creation_secs = ctx.remaining_time()
    ctx.total_supply = (
        ctx.args.deploy_min_tokens_to_create + random.randint(1, 100)
    )
    ctx.token_amounts = constrained_sum_sample_pos(
        len(ctx.accounts), ctx.total_supply
    )
    ctx.create_js_file(substitutions={
            "dao_abi": ctx.dao_abi,
            "dao_address": ctx.dao_address,
            "wait_ms": (creation_secs-3)*1000,
            "amounts": arr_str(ctx.token_amounts)
        }
    )
    print(
        "Notice: Fueling period is {} seconds so the test will wait "
        "as much".format(creation_secs)
    )

    adjusted_amounts = (
        [x/1.5 for x in ctx.token_amounts]
        if ctx.scenario_uses_extrabalance() else ctx.token_amounts
    )
    adjusted_supply = (
        ctx.total_supply / 1.5
        if ctx.scenario_uses_extrabalance() else ctx.total_supply
    )

    ctx.execute(expected={
        "dao_fueled": True,
        "total_supply": adjusted_supply,
        "balances": adjusted_amounts,
        "user0_after": adjusted_amounts[0]
    })
