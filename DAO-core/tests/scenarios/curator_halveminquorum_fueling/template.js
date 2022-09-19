var amounts = $amounts;

var dao = web3.eth.contract($dao_abi).at('$dao_address');
console.log("Creating DAO tokens");
for (i = 0; i < eth.accounts.length; i++) {
    web3.eth.sendTransaction({
        from:eth.accounts[i],
        to: dao.address,
        gas:200000,
        value:web3.toWei(amounts[i], "ether")
    });
}
checkWork();


addToTest('min_quorum_before', dao.extMinQuorum(0));
dao.halveMinQuorum.sendTransaction({from:curator, gas:120000});
checkWork();
addToTest('min_quorum_after', dao.extMinQuorum(0));
addToTest(
    'min_quorum_same',
    testMap['min_quorum_after'].eq(testMap['min_quorum_before'])
);
testResults();
