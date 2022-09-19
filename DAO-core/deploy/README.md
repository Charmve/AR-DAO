# Scripts for DAO deployment using geth

## Introduction

`prepare.py` compiles `DAO.sol` and populates some helper variables inside `prepare.js`

1. `loadScript("prepare.js")` loads these variables into geth.
2. `loadScript("deploy.js")` deploys them.

## Example usage

```
usage: prepare.py [-h] [--solc SOLC]
                  [--creation-duration-mins CREATION_DURATION_MINS]
                  [--contracts-dir CONTRACTS_DIR] [--no-limits]
                  [--curator CURATOR]
                  [--default-proposal-deposit DEFAULT_PROPOSAL_DEPOSIT]
                  [--split-execution-period SPLIT_EXECUTION_PERIOD]

DAO deployment script

optional arguments:
  -h, --help            show this help message and exit
  --solc SOLC           Full path to the solc binary to use
  --creation-duration-mins CREATION_DURATION_MINS
                        Deployed DAO creation duration in minutes
  --contracts-dir CONTRACTS_DIR
                        The directory where the contracts are located
  --no-limits           If given then a version of DAO.sol without limits is
                        compiled
  --curator CURATOR     Account to set as the curator
  --default-proposal-deposit DEFAULT_PROPOSAL_DEPOSIT
                        The proposal deposit (in ether) for every proposal of
                        the DAO
  --split-execution-period SPLIT_EXECUTION_PERIOD
                        Number of seconds after the voting deadline for which
                        a split proposal is executable
```
You can for example call the script with a specifically compiled solc and set the creation to end in 15 mins by doing:
```
./prepare.py --solc ~/ew/solidity/build/solc/solc --creation-duration-mins 15
```
