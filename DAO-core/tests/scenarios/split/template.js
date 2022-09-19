var dao_abi = $dao_abi;
var dao = web3.eth.contract(dao_abi).at('$dao_address');
var split_execution_period = $split_execution_period;
var child_dao_curator = '$child_dao_curator';

var prop_id = attempt_proposal(
    dao, // DAO in question
    child_dao_curator, // recipient
    proposalCreator, // proposal creator
    0, // proposal amount in ether
    'Voting to split and change Curator', // description
    '', //bytecode
    $debating_period, // debating period
    0, // proposal deposit in ether
    true // whether it's a split proposal or not
);

var votes = $votes;
console.log("Voting for split proposal '" + prop_id + "' ...");
for (i = 0; i < votes.length; i++) {
    console.log("User [" + i + "] is voting '" + votes[i] + "'for split proposal");
    dao.vote.sendTransaction(
        prop_id,
        votes[i],
        {
            from: eth.accounts[i],
            gas: 1000000
        }
    );
}
checkWork();
addToTest('proposal_yay', parseInt(web3.fromWei(dao.proposals(prop_id)[9])));
addToTest('proposal_nay', parseInt(web3.fromWei(dao.proposals(prop_id)[10])));

setTimeout(function() {
    miner.stop();
    console.log("Executing the split proposal...");
    // now each user who voted for the split should call splitDAO to execute the proposal
    for (i = 0; i < votes.length; i++) {
        if (votes[i]) {
            console.log("User [" + i + "] is calling splitDAO()");
            attempt_split(dao, prop_id, eth.accounts[i], child_dao_curator, split_execution_period);
        }
    }
    console.log("After split execution");
    addToTest('proposal_passed', dao.proposals(prop_id)[5]);
    addToTest('proposal_newdao', dao.splitProposalNewAddress(prop_id, 0));

    var newdao = web3.eth.contract(dao_abi).at(testMap['proposal_newdao']);
    // check token balance of each user in both DAOs
    oldDAOBalance = [];
    newDAOBalance = [];
    for (i = 0; i < eth.accounts.length; i++) {
        oldDAOBalance.push(parseFloat(web3.fromWei(dao.balanceOf(eth.accounts[i]))));
        newDAOBalance.push(parseFloat(web3.fromWei(newdao.balanceOf(eth.accounts[i]))));
    }
    addToTest('oldDAOBalance', oldDAOBalance);
    addToTest('newDAOBalance', newDAOBalance);
    addToTest('oldDaoRewardTokens', parseFloat(web3.fromWei(dao.rewardToken('$dao_address'))));
    addToTest('newDaoRewardTokens', parseFloat(web3.fromWei(dao.rewardToken(testMap['proposal_newdao']))));

    addToTest('new_dao_balance', web3.fromWei(eth.getBalance(newdao.address)).ceil());
    addToTest('new_dao_total_supply', web3.fromWei(newdao.totalSupply()).ceil());
    addToTest('newDAOProposalDeposit', parseInt(web3.fromWei(newdao.proposalDeposit())));
    addToTest('new_dao_closing_time', parseInt(newdao.closingTime()));

    testResults();
}, $debating_period * 1000);
console.log("Wait for end of debating period");
