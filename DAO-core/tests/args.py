#!/usr/bin/python2
import argparse
import sys
import os
import json
from utils import available_scenarios, calculate_bytecode
from itertools import izip


def pairwise(iterable):
    "s -> (s0, s1), (s2, s3), (s4, s5), ..."
    a = iter(iterable)
    return izip(a, a)


def make_bool(val):
    if isinstance(val, basestring):
        if val.lower() in ["false", "0", "no"]:
            return False
        elif val.lower() in ["true", "1", "yes"]:
            return True
        else:
            print(
                "ERROR: Given string '{}' can not be converted to bool".format(
                    val
                ))
            sys.exit(1)
    else:
        return bool(val)


def read_scenario_options(args):
    """ Iterate scenarios and load all argument options """
    dir = "scenarios"
    for name in os.listdir(dir):
        argfile = os.path.join(dir, name, "arguments.json")
        if os.path.isfile(argfile):
            with open(argfile, 'r') as f:
                data = json.loads(f.read())

            for arg in data:
                arg_type = None  # interpret as simple string
                if 'type' in arg:
                    if arg['type'] == "int":
                        arg_type = int
                    elif arg['type'] == "float":
                        arg_type = float
                    elif arg['type'] == "bool":
                        arg_type = make_bool
                    else:
                        print(
                            "ERROR: Unrecognized type '{}' given for argument"
                            "'{}'".format(arg['type'], arg['name'])
                        )
                        sys.exit(1)

                if 'type' in arg:
                    args.add_argument(
                        "--{}-{}".format(name, arg['name']).replace("_", "-"),
                        help=arg['description'],
                        default=arg['default'],
                        type=arg_type
                    )
                else:
                    args.add_argument(
                        "--{}-{}".format(name, arg['name']).replace("_", "-"),
                        help=arg['description'],
                        default=arg['default']
                    )


def test_args():
    """ Parse the test arguments and create and return the arguments object"""
    p = argparse.ArgumentParser(description='DAO contracts test framework')
    read_scenario_options(p)

    p.add_argument(
        '--solc',
        help='Full path to the solc binary to use'
    )
    p.add_argument(
        '--geth',
        help='Full path to the geth binary to use'
    )
    p.add_argument(
        '--keep-limits',
        action='store_true',
        help=(
            'If given then the debate limits of the original '
            'contracts will not be removed'
        )
    )
    p.add_argument(
        '--clean-chain',
        action='store_true',
        help=(
            'If given then the blockchain is deleted before any '
            'test scenario is executed'
        )
    )
    p.add_argument(
        '--verbose',
        action='store_true',
        help='If given then all test checks are printed in the console'
    )
    p.add_argument(
        '--proposal-fail',
        action='store_true',
        help='If given, then in the proposal scenario the voting will fail'
    )
    p.add_argument(
        '--compile-test',
        action='store_true',
        help='If given, then tests will only try to compile the contracts'
    )
    p.add_argument(
        '--users-num',
        type=int,
        help='The number of user accounts to create for the scenarios.'
        'Should be at least 3',
        default=5
    )
    p.add_argument(
        '--scenario',
        choices=['none'] + available_scenarios(),
        default='none',
        help='Available test scenario to play out'
    )
    p.add_argument(
        '--describe-scenarios',
        action='store_true',
        help='Print the description of all scenarios and then quit'
    )
    p.add_argument(
        '--abi',
        type=str,
        default="",
        help=(
            "If given then don't run any tests but print the abi of the given "
            "function with the arguments provided. Example call:"
            "test.py --abi \"transfer address foo uint256 5\""
        )
    )
    p.add_argument(
        '--dao-version',
        type=str,
        default="v1.0",
        choices=["v1.0", "master"],
        help="The version of the DAO code to run the tests against."
    )
    args = p.parse_args()

    # Argument verification
    if args.users_num < 3:
        print("ERROR: Tests need 3 or more users")
        sys.exit(1)

    # if it's an abi test call then just show bytecode and exit
    if args.abi != "":
        arglist = args.abi.split(" ")
        function_args = []
        for type_name, value in pairwise(arglist[1:]):
            function_args.append((type_name, value))
        bytecode = calculate_bytecode(arglist[0], *function_args)
        print("Requested bytecode is:\n{}\n.Exiting ...".format(bytecode))
        sys.exit(0)

    if args.compile_test:
        # if we are asking for compile_test then it should always be against
        # the latest version of the contracts
        args.dao_version = "master"

    return args
