
Contract Submit{

	struct work{

		  string ipfsHash;
        address userAddress;
        address moduleLeaderAddress;
        uint256 timestamp;
        string courseName;
	} 
  mapping(string => Submission) public submissions;

    // Other contract code...

    function submit(string memory _ipfsHash, string memory _courseName) public {
    
        submissions[_ipfsHash] = Submission({
            ipfsHash: _ipfsHash,
            userAddress: msg.sender,
            moduleLeaderAddress: // Set module leader address here,
            timestamp: block.timestamp,
            courseName: _courseName
        });

        // Emit an event for the submission
        emit DocumentSubmitted(msg.sender, _ipfsHash, _courseName, block.timestamp);
    }

    event DocumentSubmitted(address indexed sender, string ipfsHash, string courseName, uint256 timestamp);

}