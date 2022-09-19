console.log("Creating DTHPool Contract");
var dthContract = web3.eth.contract($dthpool_abi);
var _dthContract = dthContract.new(
    "$dao_address", // client DAO address
    eth.accounts[0], // delegate
    30, // maxTimeBlocked
    "John Doe", //delegateName
    "delegate.daohub.org", //delegateURL
    "T", //tokenSymbol
    {
	    from: contractor,
	    data: '$dthpool_bin',
	    gas: 3000000
    }, function (e, contract){
	    if (e) {
            console.log(e+" at DTHPool creation!");
	    } else if (typeof contract.address != 'undefined') {
            addToTest('dthpool_address', contract.address);
            testResults();
        }
    });
checkWork();

