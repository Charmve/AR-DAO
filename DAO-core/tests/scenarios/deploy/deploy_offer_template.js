console.log("Creating Offer Contract");
var offerContract = web3.eth.contract($offer_abi);
var _offerContract = offerContract.new(
    contractor,
    "$dao_address", // client DAO address
    '0x0',  // This is a hash of the paper contract. Does not matter for testing
    web3.toWei($offer_total, "ether"), //total costs
    web3.toWei($offer_onetime, "ether"), //one time costs
    web3.toWei(1, "ether"), //min daily costs
    {
	    from: contractor,
	    data: '$offer_bin',
	    gas: 3000000
    }, function (e, contract){
	    if (e) {
            console.log(e+" at Offer creation!");
	    } else if (typeof contract.address != 'undefined') {
            addToTest('offer_address', contract.address);
            testResults();
        }
    });
checkWork();

