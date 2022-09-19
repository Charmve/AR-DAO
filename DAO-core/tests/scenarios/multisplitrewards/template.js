var dao_abi = $dao_abi;
var dao = eth.contract(dao_abi).at('$dao_address');
var child_dao = eth.contract(dao_abi).at('$child_dao_address');
var child_curator = '$child_dao_curator';
var child_dao_members = $child_dao_members;
var grandchild_curator = '$grandchild_dao_curator';
var split_execution_period = $split_execution_period;
addToTest('grandchild_curator_childdao_balance', web3.fromWei(child_dao.balanceOf(grandchild_curator)).ceil());
if (child_curator == grandchild_curator) {
    testFail("Child curator can't also be grandchild curator");
}

var child_prop_id = attempt_proposal(
    child_dao, // DAO in question
    grandchild_curator, // recipient
    grandchild_curator, // proposal creator
    0, // proposal amount in ether
    'Proposal to split the child DAO to the grand child DAO', // description
    '', //bytecode
    $debating_period, // debating period
    0, // proposal deposit in ether
    true // whether it's a split proposal or not
);

console.log("Vote to split to grandchild DAO.");
child_dao.vote.sendTransaction(child_prop_id, true, {from: grandchild_curator, gas: 1000000});
checkWork();
console.log("After vote to split call");
setTimeout(function() {
    miner.stop();
    console.log("Executing grandchild DAO split proposal...");
    // now each user who voted for the split should call splitDAO to execute the proposal
    attempt_split(
        child_dao,
        child_prop_id,
        grandchild_curator,
        grandchild_curator,
        split_execution_period
    );
    checkWork();
    console.log("After split execution");
    addToTest('split_proposal_passed', child_dao.proposals(child_prop_id)[5]);
    addToTest('proposal_newdao', child_dao.splitProposalNewAddress(child_prop_id, 0));


    var grandchild_dao = web3.eth.contract(dao_abi).at(testMap['proposal_newdao']);
    addToTest('grandchild_dao_total_supply', parseInt(web3.fromWei(grandchild_dao.totalSupply())));
    addToTest('grandchild_dao_proposal_deposit', parseInt(web3.fromWei(grandchild_dao.proposalDeposit())));
    addToTest('grandchild_curator_dao_balance', web3.fromWei(grandchild_dao.balanceOf(grandchild_curator)).ceil());
    testResults();
}, $debating_period * 1000);
console.log("Wait for end of debating period");
