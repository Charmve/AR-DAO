console.log("Creating PFOffer Contract");
var offerContract = web3.eth.contract($pfoffer_abi);
var _offerContract = offerContract.new(
    contractor,
    "$dao_address", // client DAO address
    '0x0',  // This is a hash of the paper contract. Does not matter for testing
    web3.toWei($offer_total, "ether"), //total costs
    web3.toWei($offer_onetime, "ether"), //one time costs
    web3.toWei(1, "ether"), //min daily costs
    {
	    from: contractor,
	    data: '$pfoffer_bin',
	    gas: 3000000
    }, function (e, contract){
	    if (e) {
            console.log(e+" at PFOffer creation!");
	    } else if (typeof contract.address != 'undefined') {
            addToTest('pfoffer_address', contract.address);
            testResults();
        }
    });
checkWork();

