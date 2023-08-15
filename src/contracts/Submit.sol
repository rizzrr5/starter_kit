pragma solidity 0.5.0;

contract Submit {
    struct Work {
        string ipfsHash;
        address userAddress;
        address moduleLeaderAddress;
        uint256 timestamp;
        string courseName;
    }

    // Use bytes32 as the key type for the mapping
    mapping(bytes32 => Work) public submissions;

    // Other contract code...

    function submit(string memory _ipfsHash, string memory _courseName, address _module_leader) public {
        bytes32 hash = keccak256(bytes(_ipfsHash)); // Convert string to bytes32 hash

        submissions[hash] = Work({
            ipfsHash: _ipfsHash,
            userAddress: msg.sender,
            moduleLeaderAddress: _module_leader,
            timestamp: block.timestamp,
            courseName: _courseName
        });

        // Emit an event for the submission
        emit DocumentSubmitted(msg.sender, _ipfsHash, _courseName, block.timestamp);
    }

    event DocumentSubmitted(address indexed sender, string ipfsHash, string courseName, uint256 timestamp);
}