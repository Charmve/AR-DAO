console.log("Creating USNRewardPayout Contract");
var usnContract = web3.eth.contract($usn_abi);
var _usnContract = usnContract.new(
    contractor,
    "$offer_address", // offer address to work with
    {
	    from: contractor,
	    data: '$usn_bin',
	    gas: 3000000
    }, function (e, contract){
	    if (e) {
            console.log(e+" at USNRewardPayout creation!");
	    } else if (typeof contract.address != 'undefined') {
            addToTest('usn_address', contract.address);
            testResults();
        }
    });
checkWork();

