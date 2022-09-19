var dao = web3.eth.contract($dao_abi).at('$dao_address');
var pfoffer = web3.eth.contract($pfoffer_abi).at('$pfoffer_address');

console.log("Add pfoffer contract as allowed recipient");
dao.changeAllowedRecipients.sendTransaction('$pfoffer_address', true, {from: curator, gas: 1000000});
checkWork();

var prop_id = attempt_proposal(
    dao, // DAO in question
    '$pfoffer_address', // recipient
    proposalCreator, // proposal creator
    $offer_amount, // proposal amount in ether
    'PFOffer Description', // description
    '$transaction_bytecode', //bytecode
    $debating_period, // debating period
    $proposal_deposit, // proposal deposit in ether
    false // whether it's a split proposal or not
);

// the contractor should now make the offer contract watch the proposal votes
pfoffer.watchProposal.sendTransaction(prop_id, {from:curator, gas: 400000});
checkWork();
addToTest('only_contractor_can_watch_proposal', pfoffer.getProposalID() == 0);
pfoffer.watchProposal.sendTransaction(prop_id, {from:contractor, gas: 400000});
checkWork();
addToTest('proposal_succesfully_watched', pfoffer.getProposalID().eq(prop_id));


console.log("Vote on the proposals");
for (i = 0; i < eth.accounts.length; i++) {
    dao.vote.sendTransaction(
        prop_id,
        true,
        {
            from: eth.accounts[i],
            gas: 4000000
        }
    );
}
checkWork();

//perform the vote status check
pfoffer.checkVoteStatus.sendTransaction({from: curator, gas: 400000});
checkWork();
addToTest('approved_before_deadline', pfoffer.getWasApprovedBeforeDeadline());


setTimeout(function() {
    miner.stop();
    console.log("After debating period. NOW is: " + Math.floor(Date.now() / 1000));
    var contractor_before = eth.getBalance(contractor);
    // execute the sign()
    attempt_execute_proposal(
        dao, // target DAO
        prop_id, // proposal ID
        '$transaction_bytecode', // transaction bytecode
        proposalCreator, // proposal creator
        true, // should the proposal be closed after this call?
        true // should the proposal pass?
    );
    var contractor_after = eth.getBalance(contractor);
    addToTest('no_money_at_sign', contractor_after.eq(contractor_before));
    addToTest('contract_valid', pfoffer.getIsContractValid());
    // now attempt to execute getOneTimePayment and expect it to fail
    pfoffer.performInitialWithdrawal.sendTransaction({from: contractor, gas: 300000});
    checkWork();
    var contractor_after_onetime = eth.getBalance(contractor);
    addToTest('onetime_payment_failed', contractor_after_onetime.sub(contractor_after).lt(web3.toWei(1)));

    testResults();
}, $debating_period * 1000);
console.log("Wait for end of debating period");
miner.start(1);
