# Tests for the DAO contracts

## Using the test framework

For the full array of arguments available run `test.py --help`

```
usage: test.py [-h] [--solc SOLC] [--geth GETH] [--keep-limits]
               [--clean-chain] [--verbose] [--closing-time CLOSING_TIME]
               [--scenario {none,deploy,fund}]

DAO contracts test framework

optional arguments:
  -h, --help            show this help message and exit
  --solc SOLC           Full path to the solc binary to use
  --geth GETH           Full path to the geth binary to use
  --keep-limits         If given then the debate limits of the original
                        contracts will not be removed
  --clean-chain         If given then the blockchain is deleted before any
                        test scenario is executed
  --verbose             If given then all test checks are printed in the
                        console
  --closing-time CLOSING_TIME
                        Number of minutes from now when the newly created DAO
                        creation ends
  --scenario {none,deploy,fund}
                        Test scenario to play out
```

An example scenario you can run is the deploy scenario. Below you can see a sample test command showcasing many of the arguments:

```
./test.py --solc ~/ew/solidity/build/solc/solc --clean-chain --closing-time 60 --min-value 50 --scenario deploy --geth $GOPATH/src/github.com/ethereum/go-ethereum/build/bin/geth --verbose
```

## Scenarios

You can get a list of the available scenario by calling `test.py --describe-scenarios`. At
the time of writting this readme the following scenarios are available:

- *singlesplit*
 An 'angry' user decides to get out of the DAO and take his money with
him. He creates a proposal to split into an one-member DAO with
himself as the Curator. Then he makes a proposal to this new DAO to
transfer all of the money to himself. Assert that the money he gets
back in the end is equal to the money he put in the original DAO.

- *rewards*
 A kind soul donates to the DAO so the DAO has rewards for
distribution. Create a proposal to send the rewards to the
RewardsAccount, vote and execute it. Subsequently claim rewards and
assert that they are proportional to the tokens held by the account
claiming the reward.

- *newcontract*
A test of the DAO contract upgrade. We create a new contract with a
completely different code and vote to transfer everything to the new
contract.

- *deploy*
Deploying of the DAO, DAOcreator and SampleOffer contracts in the
blockchain and noting down of their addresses.

- *multisplitrewards*
Split out of an already split DAO thus generating a grancdchild DAO.
Subsequently test that rewards can be appropriately claimed for all of
these DAOs by their participants as expected.

- *proposal*
Create a proposal to send an amount of ether to the SampleOffer
contract. Vote on that proposal, wait for the debating period and then
execute it. Assert that the proposal deposit is returned to its
creator, and that the amount is sent to the SampleOffer and the
promise is valid.

- *extrabalance*
The DAO spends all its money and has to resort to retrieving money
from the extra balance account. This test checks that this is
succesful.

- *newcontractfail*
A test of the DAO contract upgrade where the proposal's quorum ends up
being insufficient (<53.3%) and the proposal gets rejected.

- *split*
 Testing an equal split, with a new Curator. Half of the token holders
vote for a split to a new DAO and half vote to stay with the old one.
Assert that the split happens, a new DAO is created and that the
tokens are burned from the old DAO and moved to the new DAO
succesfully. Also assert that the reward tokens are succesfully
transferred.

- *fuel_fail2*
During the fueling period of the DAO, create DAO tokens from all accounts
with both normal creation and with createTokenProxy(). When the goal is
not reached make sure that the refunds when having used
createTokenProxy() are distributed back to the users correctly.

- *fuel_fail*
During the fueling period of the DAO, send insufficient ether and
assert that the DAO is not fueled. Then assert that each user can get
a full refund.

- *fuel*
During the fueling period of the DAO, send enough ether from all
accounts to create tokens and then assert that the user's balance is
indeed correct and that the minimum fueling goal has been reached.

- *deposit*
Make a proposal to change the default proposal deposit, vote for it
and then assure that the DAO's proposal deposit did indeed change.

- *colmattack*
Before commit 842ce13aedca6365d1f6f4b62c215d4e9b265ffa an attacker
could create a proposal with a huge deposit. Then he could create a
split DAO proposal to get his share of ether plus his share of the
deposit he gave. Then if the original proposal meets the quorum the
attacker will also get his deposit back.

