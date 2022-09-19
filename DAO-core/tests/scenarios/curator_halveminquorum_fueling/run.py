import random
from utils import constrained_sum_sample_pos, arr_str


scenario_description = (
    "During the fueling period of the DAO, the curator should not be able "
    "to call halveMinQuorum(). This is a test to make sure this can't happen "
    "and to assert that the fix introduced by PR: "
    "https://github.com/slockit/DAO/pull/152 works as expected"
)


def run(ctx):
    ctx.assert_scenario_ran('deploy')

    ctx.total_supply = (
        ctx.args.deploy_min_tokens_to_create + random.randint(1, 100)
    )
    ctx.token_amounts = constrained_sum_sample_pos(
        len(ctx.accounts), ctx.total_supply
    )
    ctx.create_js_file(substitutions={
            "dao_abi": ctx.dao_abi,
            "dao_address": ctx.dao_address,
            "amounts": arr_str(ctx.token_amounts)
        }
    )

    ctx.execute(expected={
        "min_quorum_same": True
    })
