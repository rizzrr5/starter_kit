pragma solidity 0.5.0;

contract Iprm{
	//smart contract goes here
	string articleHash;
	string name="hello";

	function set(string memory hash) public {
	articleHash=hash;

	}

	function get() public view returns(string memory) {
	return articleHash;
	}
	function getName() public view returns(string memory){
	return name;
	}


}
