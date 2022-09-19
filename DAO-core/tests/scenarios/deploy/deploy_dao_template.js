var _curator = web3.eth.accounts[0];
console.log("Creating DAO Contract");
var daoContract = web3.eth.contract($dao_abi);
if ($using_old_dao) {
    daoContract.new(
	    _curator,
	    "$dao_creator_address",
        $default_proposal_deposit,
	    web3.toWei($min_tokens_to_create, "ether"),
	    $closing_time,
        0,
	    {
		    from: web3.eth.accounts[0],
		    data: '$dao_bin',
		    gas: 4700000
        }, function (e, contract){
	        if (e) {
                console.log(e+" at DAO creation!");
	        } else if (typeof contract.address != 'undefined') {
                addToTest('dao_address', contract.address);
                testResults();
            }
        });
} else {
    daoContract.new(
	    _curator,
	    "$dao_creator_address",
        $default_proposal_deposit,
	    web3.toWei($min_tokens_to_create, "ether"),
	    $closing_time,
        0,
        "Test DAO token", // DAO Token name
        "A", // DAO Token symbol
        16,
	    {
		    from: web3.eth.accounts[0],
		    data: '$dao_bin',
		    gas: 4700000
        }, function (e, contract){
	        if (e) {
                console.log(e+" at DAO creation!");
	        } else if (typeof contract.address != 'undefined') {
                addToTest('dao_address', contract.address);
                testResults();
            }
        });
}
checkWork();

