const Decentragram = artifacts.require("Decentragram");

module.exports = async function(deployer, network) {

	//Local dev
	if (!network.startsWith('live')) {
		try{
  			deployer.deploy(Decentragram)		
		} catch (err) {
			console.log(err)
		}
		} else {
			deployer.deploy(Decentragram)
		}	
};