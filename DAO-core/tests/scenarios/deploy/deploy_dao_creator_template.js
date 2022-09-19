console.log("Creating DAOCreator Contract");
var creatorContract = web3.eth.contract($creator_abi);
var _daoCreatorContract = creatorContract.new(
    {
	    from: web3.eth.accounts[0],
	    data: '$creator_bin',
	    gas: 4700000
    }, function (e, contract){
	    if (e) {
            console.log(e+" at DAOCreator creation!");
	    } else if (typeof contract.address != 'undefined') {
            addToTest('dao_creator_address', contract.address);
            testResults();
        }
    });
checkWork();
