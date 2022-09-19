import random
from utils import arr_str, create_votes_array, bool_to_str

scenario_description = (
    "Create a proposal to send an amount of ether to the SampleOffer contract."
    " Vote on that proposal, wait for the debating period and then execute it."
    " Assert that the proposal deposit is returned to its creator, and that "
    "the amount is sent to the SampleOffer and the promise is valid"
)


def count_token_votes(amounts, votes):
    """Returns how many tokens votes yay and how many voted nay"""
    yay = 0
    nay = 0
    for idx, amount in enumerate(amounts):
        if votes[idx]:
            yay += amount
        else:
            nay += amount
    return yay, nay


def run(ctx):
    ctx.assert_scenario_ran('fuel')

    votes = create_votes_array(
        ctx.token_amounts,
        not ctx.args.proposal_fail,
        False
    )
    yay, nay = count_token_votes(ctx.token_amounts, votes)
    ctx.create_js_file(substitutions={
        "dao_abi": ctx.dao_abi,
        "dao_address": ctx.dao_address,
        "offer_abi": ctx.offer_abi,
        "offer_address": ctx.offer_address,
        "offer_amount": ctx.args.deploy_total_costs,
        "offer_desc": 'Test Proposal',
        "proposal_deposit": ctx.args.proposal_deposit,
        "transaction_bytecode": '0x2ca15122',  # solc --hashes SampleOffer.sol
        "debating_period": ctx.args.proposal_debate_seconds,
        "votes": arr_str(votes),
        "should_halve_minquorum": bool_to_str(ctx.args.proposal_halveminquorum)
    })
    print(
        "Notice: Debate period is {} seconds so the test will wait "
        "as much".format(ctx.args.proposal_debate_seconds)
    )

    ctx.execute(expected={
        "dao_proposals_number": "1",
        "proposal_yay": yay,
        "proposal_nay": nay,
        "calculated_deposit": ctx.args.proposal_deposit,
        "onetime_costs": ctx.args.deploy_onetime_costs,
        "deposit_returned": True,
        "offer_promise_valid": True
    })
