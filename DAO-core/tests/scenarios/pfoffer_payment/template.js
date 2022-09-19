var dao = web3.eth.contract($dao_abi).at('$dao_address');
var pfoffer = web3.eth.contract($pfoffer_abi).at('$pfoffer_address');

// assert the time is right
var now = new BigNumber(time_now());
var sign_time = pfoffer.getDateOfSignature();
var wait_time = now.sub(sign_time.add($payout_freeze_period));
if (wait_time < 0) {
    wait_time = 0;
}
setTimeout(function() {
    var contractor_before = eth.getBalance(contractor);
    pfoffer.performInitialWithdrawal.sendTransaction({from: curator, gas: 300000});
    checkWork();
    var contractor_after = eth.getBalance(contractor);
    addToTest('only_contractor_can_call', !pfoffer.getInitialWithdrawalDone());
    pfoffer.performInitialWithdrawal.sendTransaction({from: contractor, gas: 500000});
    checkWork();
    var contractor_after2 = eth.getBalance(contractor);
    addToTest('one_time_paid', pfoffer.getInitialWithdrawalDone());
    addToTest(
        'one_time_costs_amount_as_expected',
        contractor_after2.sub(contractor_after).sub(web3.toWei($expected_onetime)).abs().lt(new BigNumber(100000000000000000))
    );
    testResults();
}, wait_time * 1000);
console.log("Waiting for " + wait_time + " seconds until the payoutfreezeperiod is over");


