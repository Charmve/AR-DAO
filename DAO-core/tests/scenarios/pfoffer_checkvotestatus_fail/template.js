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
testResults();
