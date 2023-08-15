const Iprm = artifacts.require("Iprm");
const User = artifacts.require("User");
const Submit = artifacts.require("Submit");


module.exports = function(deployer) {
  deployer.deploy(Iprm);
  deployer.deploy(User);
  deployer.deploy(Submit);
};
