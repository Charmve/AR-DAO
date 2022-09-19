import sys
from utils import constrained_sum_sample_pos, arr_str


scenario_description = (
    "During the fueling period of the DAO, create DAO tokens from all accounts "
    "with both normal creation and with createTokenProxy(). When the goal "
    "is not reached make sure that the refunds when having used "
    "createTokenProxy() are distributed back to the users correctly"
)


def run(ctx):
    ctx.assert_scenario_ran('deploy')

    accounts_num = len(ctx.accounts)
    if accounts_num * 2 >= ctx.args.deploy_min_tokens_to_create - 4:
        print("Please increase the minimum fueling goal for the scenario.")
        sys.exit(1)

    creation_secs = ctx.remaining_time()
    total_supply = ctx.args.deploy_min_tokens_to_create - 4
    proxy_amounts = constrained_sum_sample_pos(
        accounts_num, total_supply / 2
    )
    normal_amounts = constrained_sum_sample_pos(
        accounts_num, total_supply / 2
    )
    ctx.token_amounts = [
        sum(x) for x in zip(proxy_amounts[::-1], normal_amounts)
    ]
    ctx.total_supply = sum(ctx.token_amounts)
    ctx.create_js_file(
        substitutions={
            "dao_abi": ctx.dao_abi,
            "dao_address": ctx.dao_address,
            "wait_ms": (creation_secs-3)*1000,
            "proxy_amounts": arr_str(proxy_amounts),
            "normal_amounts": arr_str(normal_amounts)
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
