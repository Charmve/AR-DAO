import sys
import json
from utils import extract_test_dict, seconds_in_future, bool_to_str


scenario_description = (
    "Deploying of the DAO, DAOcreator and SampleOffer contracts in the "
    "blockchain and noting down of their addresses"
)


def calculate_closing_time(obj, script_name, substitutions):
    obj.closing_time = seconds_in_future(obj.args.deploy_creation_seconds)
    substitutions['closing_time'] = obj.closing_time
    return substitutions


def deploy_contract(ctx, substitutions, name, result, json_dict, cb=None):
    ctx.create_js_file(
        substitutions=substitutions,
        specific_name=name,
        cb_before_creation=cb
    )
    output = ctx.run_script('{}.js'.format(name))
    results = extract_test_dict(name, output)

    try:
        setattr(ctx, result, results[result])
    except:
        print(
            "ERROR: Could not find '{}' in the deploy scenario"
            ". The output was:\n{}".format(result, output)
        )
        sys.exit(1)

    print("{} is: {}".format(result, getattr(ctx, result)))
    json_dict[result] = getattr(ctx, result)


def run(ctx):
    json_dict = {}
    deploy_contract(
        ctx,
        substitutions={
            "creator_abi": ctx.creator_abi,
            "creator_bin": ctx.creator_bin
        },
        name='deploy_dao_creator',
        result='dao_creator_address',
        json_dict=json_dict
    )
    deploy_contract(
        ctx,
        substitutions={
            "dao_abi": ctx.dao_abi,
            "dao_bin": ctx.dao_bin,
            "dao_creator_address": ctx.dao_creator_address,
            "min_tokens_to_create": ctx.args.deploy_min_tokens_to_create,
            "default_proposal_deposit": ctx.args.deploy_proposal_deposit,
            "using_old_dao": bool_to_str(ctx.args.dao_version != "master")
        },
        name='deploy_dao',
        result='dao_address',
        json_dict=json_dict,
        cb=calculate_closing_time
    )
    deploy_contract(
        ctx,
        substitutions={
            "dao_address": ctx.dao_address,
            "offer_abi": ctx.offer_abi,
            "offer_bin": ctx.offer_bin,
            "offer_onetime": ctx.args.deploy_onetime_costs,
            "offer_total": ctx.args.deploy_total_costs,
        },
        name='deploy_offer',
        result='offer_address',
        json_dict=json_dict
    )

    if ctx.scenario_uses_pfoffer():
        deploy_contract(
            ctx,
            substitutions={
                "dao_address": ctx.dao_address,
                "pfoffer_abi": ctx.pfoffer_abi,
                "pfoffer_bin": ctx.pfoffer_bin,
                "offer_onetime": ctx.args.deploy_onetime_costs,
                "offer_total": ctx.args.deploy_total_costs,
            },
            name='deploy_pfoffer',
            result='pfoffer_address',
            json_dict=json_dict
        )

    deploy_contract(
        ctx,
        substitutions={
            "offer_address": ctx.offer_address,
            "usn_abi": ctx.usn_abi,
            "usn_bin": ctx.usn_bin
        },
        name='deploy_usn',
        result='usn_address',
        json_dict=json_dict
    )

    if ctx.scenario_uses_dthpool():
        deploy_contract(
            ctx,
            substitutions={
                "dao_address": ctx.dao_address,
                "dthpool_abi": ctx.dthpool_abi,
                "dthpool_bin": ctx.dthpool_bin
            },
            name='deploy_dthpool',
            result='dthpool_address',
            json_dict=json_dict
        )

    with open(ctx.save_file, "w") as f:
        f.write(json.dumps(json_dict))

    # after deployment recalculate for the subsequent tests what the min
    # amount of tokens is in the case of extrabalance tests
    if ctx.scenario_uses_extrabalance():
        ctx.args.deploy_min_tokens_to_create = (
            int(ctx.args.deploy_min_tokens_to_create * 1.5)
        )
