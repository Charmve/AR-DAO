#!/usr/bin/python2

import json
import subprocess
import argparse
import os
import inspect

contracts_dir = "../"
currentdir = os.path.dirname(
    os.path.abspath(inspect.getfile(inspect.currentframe()))
)
os.sys.path.insert(0, os.path.dirname(currentdir))
from tests.utils import determine_binary, edit_dao_source, rm_file, to_wei


class TestDeployContext():
    def __init__(self, args):
        self.args = args
        self.args.solc = determine_binary(args.solc, 'solc', True)

    def compile_contract(self, contract_name):
        if self.args.no_limits and contract_name == "DAO.sol":
            contract_path = edit_dao_source(
                self.args.contracts_dir,
                False,  # keep limits
                self.args.min_proposal_debate,
                self.args.min_split_debate,
                True,  # halve min quorum test, remove year limit
                self.args.split_execution_period,
                True,  # Normal pricing
                True,  # Don't edit creationGracePeriod
            )
        else:
            contract_path = os.path.join(
                self.args.contracts_dir,
                contract_name
            )
        print("    Compiling {}...".format(contract_path))
        data = subprocess.check_output([
            self.args.solc,
            contract_path,
            "--optimize",
            "--combined-json",
            "abi,bin"
        ])
        return json.loads(data)

    def cleanup(self):
        try:
            rm_file(os.path.join(self.args.contracts_dir, "DAOcopy.sol"))
            rm_file(
                os.path.join(self.args.contracts_dir, "TokenCreationCopy.sol")
            )
        except:
            pass


if __name__ == "__main__":
    p = argparse.ArgumentParser(description='DAO deployment script')
    p.add_argument(
        '--solc',
        help='Full path to the solc binary to use'
    )
    p.add_argument(
        '--creation-duration-mins',
        type=int,
        default=60,
        help='Deployed DAO creation duration in minutes'
    )
    p.add_argument(
        '--contracts-dir',
        default="..",
        help='The directory where the contracts are located'
    )
    p.add_argument(
        '--no-limits',
        action='store_true',
        help='If given then a version of DAO.sol without limits is compiled'
    )
    p.add_argument(
        '--curator',
        default="0x08144824954c65b12f68b75072488e634ac4e67a",  # Griff testnet
        help='Account to set as the curator'
    )
    p.add_argument(
        '--default-proposal-deposit',
        type=int,
        default=1,
        help='The proposal deposit (in ether) for every proposal of the DAO'
    )
    p.add_argument(
        '--split-execution-period',
        type=int,
        default=20,
        help=(
            'Number of seconds after the voting deadline for which a split '
            'proposal is executable'
        )
    )
    p.add_argument(
        '--min-proposal-debate',
        type=int,
        default=3600,
        help=(
            'Minumum number of seconds that a generic proposal can have'
        )
    )
    p.add_argument(
        '--min-split-debate',
        type=int,
        default=3600,
        help=(
            'Minumum number of seconds that a split proposal can have'
        )
    )
    p.add_argument(
        '--offer-contractor',
        default="0x08144824954c65b12f68b75072488e634ac4e67a",  # Griff testnet
        help='Account to set as the SampleOffer contractor'
    )
    p.add_argument(
        '--offer-total-costs',
        type=int,
        default=50,
        help='Total costs of the SampleOffer in ether'
    )
    p.add_argument(
        '--offer-onetime-costs',
        type=int,
        default=10,
        help='Onetime costs of the SampleOffer in ether'
    )
    p.add_argument(
        '--offer-min-daily-withdraw',
        type=int,
        default=1,
        help='Minimum daily withrdawal limit'
    )
    p.add_argument(
        '--offer-client-dao-address',
        default="0x159fe90ac850c895e4fd144e705923cfa042d974",  # A testnet DAO
        help='The address of the DAO to set as the client of the SampleOffer'
    )
    args = p.parse_args()
    ctx = TestDeployContext(args)
    comp = ctx.compile_contract("DAO.sol")
    comp2 = ctx.compile_contract("SampleOffer.sol")

    with open("prepare.js", "w") as f:
        f.write("dao_abi = {};\n".format(comp['contracts']['DAO']['abi']))
        f.write("dao_bin = '{}';\n".format(comp['contracts']['DAO']['bin']))
        f.write("creator_abi = {};\n".format(
          comp['contracts']['DAO_Creator']['abi'])
        )
        f.write("creator_bin = '{}';\n".format(
          comp['contracts']['DAO_Creator']['bin'])
        )
        f.write("offer_abi = {};\n".format(
            comp2['contracts']['SampleOffer']['abi'])
        )
        f.write("offer_bin = '{}';\n".format(
            comp2['contracts']['SampleOffer']['bin'])
        )
        f.write("seconds_from_now = {};\n".format(
          args.creation_duration_mins * 60)
        )
        f.write("curator = \"{}\";\n".format(args.curator))
        f.write("default_proposal_deposit = {};\n".format(
            args.default_proposal_deposit)
        )
        f.write("contractor = \"{}\";\n".format(args.offer_contractor))
        f.write("offer_total_costs = {};\n".format(
            to_wei(args.offer_total_costs)
        ))
        f.write("offer_onetime_costs = {};\n".format(
            to_wei(args.offer_onetime_costs)
        ))
        f.write("offer_min_daily_withdraw = {};\n".format(
            to_wei(args.offer_min_daily_withdraw)
        ))
        f.write("offer_client_dao_address = '{}';\n".format(
            args.offer_client_dao_address
        ))

    ctx.cleanup()
