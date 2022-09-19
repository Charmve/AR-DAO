#!/usr/bin/python2

# Use test.py with any valid combination of arguments in order to run
# DAO test scenarios

import os
import json
import subprocess
import shutil
import sys
import textwrap
import importlib
import inspect
from string import Template
from utils import (
    rm_file, determine_binary, ts_now, write_js, available_scenarios,
    create_genesis, edit_dao_source, eval_test, checkout_file, reset_file,
    fail_if_outstanding_changes
)
from args import test_args


class TestContext():
    def __init__(self, args):
        self.running_scenarios = []
        self.ran_scenarios = []
        self.args = args
        self.tests_ok = True
        self.dao_address = None
        self.offer_address = None
        self.token_amounts = None
        self.dao_sources = [
            "DAO.sol",
            "DAOTokenCreationProxyTransferer.sol",
            "ManagedAccount.sol",
            "Token.sol",
            "TokenCreation.sol"
        ]
        self.tests_dir = os.path.dirname(os.path.realpath(__file__))
        datadir = os.path.join(self.tests_dir, "data")
        self.save_file = os.path.join(datadir, "saved")
        self.templates_dir = os.path.join(self.tests_dir, 'templates')
        self.contracts_dir = os.path.dirname(self.tests_dir)
        self.solc = determine_binary(args.solc, 'solc', args.scenario != 'none')
        self.geth = determine_binary(
            args.geth,
            'geth',
            args.scenario != 'none' or not args.compile_test
        )

        if args.describe_scenarios:
            self.describe_scenarios()
            sys.exit(0)

        if not self.args.compile_test:
            # keep this at end since data loaded should override constructor
            if not os.path.isdir(datadir) or args.clean_chain:
                self.clean_blockchain()
                self.init_data(args.users_num)
            else:
                self.attemptLoad()

    def init_data(self, accounts_num):
        print("Creating accounts and genesis block ...")
        with open(
                os.path.join(self.templates_dir, 'accounts.template.js'),
                'r'
        ) as f:
            data = f.read()
        tmpl = Template(data)
        s = tmpl.substitute(accounts_number=accounts_num)
        with open('accounts.js', "w") as f:
            f.write(s)
        output = self.run_script('accounts.js')
        self.accounts = json.loads(output)
        # creating genesis block with a generous allocation for all accounts
        create_genesis(self.accounts)
        # now initialize geth with the new blockchain
        subprocess.check_output([
            self.geth, "--datadir", "./data", "init", "./genesis_block.json"
        ])
        print("Done!")

    def remaining_time(self):
        return self.closing_time - ts_now()

    def attemptLoad(self):
        """
        If there is a saved file, then attempt to load DAO data from there
        """
        if os.path.isfile(self.save_file):
            print("Loading DAO from a saved file...")
            with open(self.save_file, 'r') as f:
                data = json.loads(f.read())
            self.dao_address = data['dao_address']
            self.dao_creator_address = data['dao_creator_address']
            self.offer_address = data['offer_address']
            self.closing_time = data['closing_time']
            print("Loaded dao_address: {}".format(self.dao_address))
            print("Loaded dao_creator_address: {}".format(self.dao_creator_address))

    def clean_blockchain(self):
        """Clean all blockchain data directories apart from the keystore"""
        print("Cleaning blockchain data directory ...")
        data_dir = os.path.join(self.tests_dir, "data")
        shutil.rmtree(os.path.join(data_dir, "chaindata"), ignore_errors=True)
        shutil.rmtree(os.path.join(data_dir, "dapp"), ignore_errors=True)
        shutil.rmtree(os.path.join(data_dir, "keystore"), ignore_errors=True)
        rm_file(os.path.join(data_dir, "nodekey"))
        rm_file(os.path.join(data_dir, "saved"))

    def run_script(self, script):
        print("Running '{}' script".format(script))
        if script == 'accounts.js':
            return subprocess.check_output([
                self.geth,
                "--networkid",
                "123",
                "--nodiscover",
                "--maxpeers",
                "0",
                "--datadir",
                "./data",
                "--verbosity",
                "0",
                "js",
                script
            ])
        else:
            return subprocess.check_output([
                self.geth,
                "--networkid",
                "123",
                "--nodiscover",
                "--maxpeers",
                "0",
                "--datadir",
                "./data",
                "--verbosity",
                "0",
                "js",
                script
            ])

    def checkout_dao_version(self):
        if self.args.dao_version == "master":
            return
        fail_if_outstanding_changes(self.contracts_dir, self.dao_sources)
        print("Checking out '{}' DAO contracts ...".format(
            self.args.dao_version)
        )
        for source in self.dao_sources:
            checkout_file(
                os.path.join(self.contracts_dir, source),
                self.args.dao_version
            )

    def reset_dao_version(self):
        if self.args.dao_version == "master":
            return
        for source in self.dao_sources:
            reset_file(os.path.join(self.contracts_dir, source))

    def compile_cleanup(self):
        self.reset_dao_version()
        rm_file(os.path.join(self.contracts_dir, "DAOcopy.sol"))
        rm_file(os.path.join(self.contracts_dir, "TokenCreationCopy.sol"))
        rm_file(os.path.join(self.contracts_dir, "RewardOfferCopy.sol"))
        rm_file(os.path.join(self.contracts_dir, "OfferCopy.sol"))
        rm_file(os.path.join(self.contracts_dir, "PFOfferCopy.sol"))
        rm_file(os.path.join(self.contracts_dir, "USNRewardPayOutCopy.sol"))
        rm_file(os.path.join(self.contracts_dir, "DTHPoolCopy.sol"))

    def compile_contract(self, contract_path):
        print("    Compiling {}...".format(contract_path))
        data = subprocess.check_output([
            self.solc,
            contract_path,
            "--optimize",
            "--combined-json",
            "abi,bin"
        ])
        return json.loads(data)

    def compile_contracts(self, keep_limits):
        if not self.solc:
            print("Error: No valid solc compiler provided")
            sys.exit(1)

        # checkout the requested version of the DAO sources
        self.checkout_dao_version()
        print("Compiling the DAO contracts...")
        compile_success = True
        try:
            dao_contract = os.path.join(self.contracts_dir, "DAO.sol")
            if not os.path.isfile(dao_contract):
                print("DAO contract not found at {}".format(dao_contract))
                sys.exit(1)
            dao_contract = edit_dao_source(
                self.contracts_dir,
                keep_limits,
                1,  # min_proposal_debate
                1,  # min_proposal_split
                self.args.proposal_halveminquorum,
                self.args.split_execution_period,
                self.scenario_uses_extrabalance(),
                self.args.scenario == "fuel_fail_extrabalance",
                self.args.deploy_offer_payment_period,
                self.args.deploy_pfoffer_payout_freeze_period,
                self.args.deploy_pfoffer_vote_status_deadline
                if not ctx.args.scenario == "pfoffer_checkvotestatus_fail"
                else ctx.args.proposal_debate_seconds - 1,
                self.args.dao_version == "v1.0"
            )
            # compile USNRewardPayout and all contracts it depends on
            usn = os.path.join(self.contracts_dir, "USNRewardPayOutCopy.sol")
            res = self.compile_contract(usn)
            contract = res["contracts"]["DAO"]
            DAOCreator = res["contracts"]["DAO_Creator"]
            self.creator_abi = DAOCreator["abi"]
            self.creator_bin = DAOCreator["bin"]
            self.dao_abi = contract["abi"]
            self.dao_bin = contract["bin"]
            self.offer_abi = res["contracts"]["RewardOffer"]["abi"]
            self.offer_bin = res["contracts"]["RewardOffer"]["bin"]
            self.usn_abi = res["contracts"]["USNRewardPayOut"]["abi"]
            self.usn_bin = res["contracts"]["USNRewardPayOut"]["bin"]

            # compile DTHPool
            if self.args.compile_test or self.scenario_uses_dthpool():
                dthpool = os.path.join(self.contracts_dir, "DTHPoolCopy.sol")
                res = self.compile_contract(dthpool)
                self.dthpool_abi = res["contracts"]["DTHPool"]["abi"]
                self.dthpool_bin = res["contracts"]["DTHPool"]["bin"]

            # If a compilation test was requested we can stop here.
            # Until solc gets a version that can compile PFOFfer we don't
            # add it to the test so that Travis can compile succesfully
            if self.args.compile_test:
                print("DAO Contracts compiled successfully!")
                sys.exit(220)

            # compile PFOffer
            if self.args.compile_test or self.scenario_uses_pfoffer():
                pfoffer = os.path.join(self.contracts_dir, "PFOfferCopy.sol")
                res = self.compile_contract(pfoffer)
                self.pfoffer_abi = res["contracts"]["PFOffer"]["abi"]
                self.pfoffer_bin = res["contracts"]["PFOffer"]["bin"]
        except SystemExit as e:
            if e.code != 220:
                # 220 is sys.exit(succesful_compilation) in the case of the
                # simple compilation test. If not then compilation must have
                # failed.
                compile_success = False
                raise
        except:
            compile_success = False
        finally:
            self.compile_cleanup()

        if not compile_success:
            print("ERROR at contract compiling")
            sys.exit(1)
        elif self.args.compile_test:
            sys.exit(0)

    def create_js_file(
            self,
            substitutions,
            specific_name=None,
            cb_before_creation=None
    ):
        """
        Creates a js file from a template called template.js found in the same
        directory as the scenario. Alternatively if specific_name is given then
        it creates a js file from that template.

        Parameters
        ----------
        substitutions : dict
        A dict of the substitutions to make in the template
        file in order to produce the final js

        specific_name : string
        (Optional) If given then the generic template.js file is not chosen but
        instead a file of the specific given name ending with _template.js is
        used.

        cb_before_creation : function
        (Optional) A callback function to be called right before substitution.
        It should accept the following arguments:
        (test_framework_object, name_of_js_file, substitutions_dict)
        and it returns the edited substitutions map
        """
        scenario_name = self.running_scenario()
        name = specific_name if specific_name else self.running_scenario()
        scenario_dir = os.path.join(self.tests_dir, "scenarios", scenario_name)
        fullpath = os.path.join(
            scenario_dir,
            name + '_template.js' if specific_name else 'template.js'
        )
        print("Creating {}.js".format(name))
        with open(fullpath, 'r') as f:
            data = f.read()
        tmpl = Template(data)
        if cb_before_creation:
            substitutions = cb_before_creation(self, name, substitutions)
        s = tmpl.substitute(substitutions)
        write_js("{}.js".format(name), s, len(self.accounts))

    def execute(self, expected):
        output = self.run_script('{}.js'.format(self.running_scenario()))
        return eval_test(self.running_scenario(), output, expected)

    def scenario_uses_extrabalance(self):
        """
        Check if the target scenario requires late sale, in order to
        populate the extraBalance account
        """
        return ctx.args.scenario in [
            "extrabalance",
            "stealextrabalance",
            "fuel_fail_extrabalance"
        ]

    def scenario_uses_dthpool(self):
        """
        Check if the target scenario requires the DTHPool to be deployed
        """
        return ctx.args.scenario in [
            "fuel_predictive",
            "dthpool"
        ]

    def scenario_uses_pfoffer(self):
        """
        Check if the target scenario requires the PFOffer to be deployed
        """
        return ctx.args.scenario in [
            "pfoffer",
            "pfoffer_checkvotestatus_fail",
            "pfoffer_payment"
        ]

    def running_scenario(self):
        """Get the currently running scenario name"""
        return self.running_scenarios[-1]

    def describe_scenarios(self):
        """Get all scenario descriptions and print them in the screen"""
        print("Available scenarios for DAO testing.")
        for name in available_scenarios():
            scenario = importlib.import_module(
                "scenarios.{}.run".format(name)
            )
            print("== {} ==\n{}.\n".format(
                name,
                textwrap.fill(scenario.scenario_description)
            ))

    def assert_scenario_ran(self, name):
        if name not in self.ran_scenarios:
            self.run_scenario(name)
            return False
        return True

    def run_scenario(self, name):
        if name == 'None':
            print("Asked to run no scenario. Quitting ...")
            return
        self.running_scenarios.append(name)
        scenario = importlib.import_module("scenarios.{}.run".format(name))
        scenario.run(self)
        self.running_scenarios.pop()
        self.ran_scenarios.append(name)

    def run_test(self, args):
        # All scenarios would need to have the contracts compiled
        self.compile_contracts(args.keep_limits)
        if not self.geth:
            print("Error: No valid geth binary provided/found")
            sys.exit(1)
        self.run_scenario(self.args.scenario)

if __name__ == "__main__":
    currentdir = os.path.dirname(
        os.path.abspath(inspect.getfile(inspect.currentframe()))
    )
    os.sys.path.insert(0, currentdir)
    args = test_args()
    ctx = TestContext(args)
    ctx.run_test(args)
