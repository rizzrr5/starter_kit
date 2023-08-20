pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

contract Iprm{
	//smart contract goes here
	 struct Work {
        string ipfsHash;
        address userAddress;
        address moduleLeaderAddress;
        uint256 timestamp;
        string courseName;
    }
	 

     mapping(address => string[]) private userSubmissions;
       
	  mapping(bytes32 => Work) public submissions;

 function submit(string memory _ipfsHash, string memory _courseName, address _module_leader) public {
        bytes32 hash = keccak256(bytes(_ipfsHash)); // Convert string to bytes32 hash

        submissions[hash] = Work({
            ipfsHash: _ipfsHash,
            userAddress: msg.sender,
            moduleLeaderAddress: _module_leader,
            timestamp: block.timestamp,
            courseName: _courseName
        });
        userSubmissions[msg.sender].push(_ipfsHash);
        // Emit an event for the submission
        emit DocumentSubmitted(msg.sender, _ipfsHash, _courseName, block.timestamp);
    }
     function getUserSubmissions() public view returns (string[] memory) {
        return userSubmissions[msg.sender]; // Retrieve all submission hashes for the calling user
    }

    event DocumentSubmitted(address indexed sender, string ipfsHash, string courseName, uint256 timestamp);

}
