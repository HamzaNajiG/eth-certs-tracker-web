var certs = artifacts.require("./Certs.sol");

module.exports = function(deployer) {
  deployer.deploy(certs);
};
