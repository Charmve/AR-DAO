from utils import arr_str
import time

scenario_description = (
    """Split out of an already split DAO thus generating a grancdchild DAO.
    Subsequently test that rewards can be appropriately claimed for all of
    these DAOs by their participants as expected."""
)


def run(ctx):
    ctx.assert_scenario_ran('split')
    # right after the split scenario ran, wait sufficient time for the
    # child_dao closingTime() to be reached.
    time_now = round(time.time())
    if time_now < ctx.child_dao_closing_time:
        wait_for_secs = ctx.child_dao_closing_time - time_now
        print(
            "The child DAO's closing time is not yet reached. Test will wait "
            "for {} seconds.".format(wait_for_secs)
        )
        time.sleep(wait_for_secs)
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "split_execution_period": ctx.args.split_execution_period,
        "child_dao_curator": ctx.child_dao_curator,
        "grandchild_dao_curator": ctx.grandchild_dao_curator,
        "child_dao_address": ctx.child_dao_address,
        "child_dao_members": arr_str(ctx.child_dao_members),
        "proposal_deposit": ctx.args.proposal_deposit,
        "debating_period": ctx.args.proposal_debate_seconds
        }
    )
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.proposal_debate_seconds)
    )

    ctx.execute(expected={
        "grandchild_curator_dao_balance": ctx.grandchild_dao_curator_before,
        "split_proposal_passed": True
    })
