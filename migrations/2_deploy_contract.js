const Iprm = artifacts.require("Iprm");
const User = artifacts.require("User");
const CourseWork = artifacts.require("CourseWork");


module.exports = function(deployer) {
  deployer.deploy(Iprm);
  deployer.deploy(User);
  deployer.deploy(CourseWork);
};
