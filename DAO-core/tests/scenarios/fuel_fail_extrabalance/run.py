import random
from utils import constrained_sum_sample_pos, arr_str


scenario_description = (
    "During the fueling period of the DAO, using the extra balance, send"
    "insufficient ether and assert that the DAO is not fueled. Then assert "
    "that each user can get a full refund including the portion that was sent "
    "to the extra balance account. Essentially test that commit "
    "9ebf64b44bf5948a2df48a7072168106fcb1f69b does its job correctly."
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
            "wait_ms": (creation_secs)*1000,
            "amounts": arr_str(ctx.token_amounts)
        }
    )
    print(
        "Notice: Fueling period is {} seconds so the test will wait "
        "as much".format(creation_secs)
    )
    adjusted_supply = ctx.total_supply / 1.5

    ctx.execute(expected={
        "dao_fueled": False,
        "total_supply": adjusted_supply,
        "refund": ctx.token_amounts
    })
