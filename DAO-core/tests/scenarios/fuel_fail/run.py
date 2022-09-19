import random
from utils import constrained_sum_sample_pos, arr_str


scenario_description = (
    "During the fueling period of the DAO, send insufficient ether "
    "and assert that the DAO is not fueled. Then assert that each user can "
    "get a full refund"
)


def run(ctx):
    ctx.assert_scenario_ran('deploy')

    accounts_num = len(ctx.accounts)
    creation_secs = ctx.remaining_time()
    ctx.total_supply = random.randint(
        5, ctx.args.deploy_min_tokens_to_create - 4
    )
    ctx.token_amounts = constrained_sum_sample_pos(
        accounts_num, ctx.total_supply
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
    ctx.execute(expected={
        "dao_fueled": False,
        "total_supply": ctx.total_supply,
        "refund": ctx.token_amounts
    })
