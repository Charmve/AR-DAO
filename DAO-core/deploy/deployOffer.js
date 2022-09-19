// first run prepare.js to import the compiled source code and some other helper variables
// before you do that run prepare.py to compile the latest version of the software in DAO
// and populate the helper variables

personal.unlockAccount(eth.accounts[0]);
var offerContract = web3.eth.contract(offer_abi);

var _offerrContract = offerContract.new(
    contractor,
    offer_client_dao_address,
    "0x0",
    offer_total_costs,
    offer_onetime_costs,
    offer_min_daily_withdraw,
    {
	    from: web3.eth.accounts[0],
	    data: offer_bin,
	    gas: 4000000
    }, function (e, contract){
	    if (e) {
            console.log(e+ " at DAOCreator creation!");
	    } else if (typeof contract.address != 'undefined') {
            console.log("The Deployed Offer address is:" + contract.address);

	    }
    });
