pragma solidity 0.5.0;

contract Iprm{
	//smart contract goes here
	string articleHash;
	string name="hello";
	  event DocumentSubmitted(address indexed sender, string documentHash, string name,uint256 timestamp);


	function set(string memory hash) public {
	articleHash=hash;
	name="hello";
	emit DocumentSubmitted(msg.sender, hash,name, block.timestamp);

	}

	function get() public view returns(string memory) {
	return articleHash;
	}
	function getName() public view returns(string memory){
	return name;
	}


}
