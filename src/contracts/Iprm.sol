pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

contract Iprm{
	//smart contract goes here
	 struct Work {
        string ipfsHash;
        address userAddress;
        address moduleLeaderAddress;
        uint256 timestamp;
        string courseId;

    }
	 

     mapping(address => string[]) private userSubmissions;
       mapping(string=> string[]) private courseSubmission ;
	  mapping(bytes32 => Work) public submissions;
	  mapping(address=>mapping(string=>string)) private userSubmission1;
	   address[] private submittedUsers;

 function submit(string memory _ipfsHash, string memory _courseId, address _module_leader) public {
        bytes32 hash = keccak256(bytes(_ipfsHash)); 

        submissions[hash] = Work({
            ipfsHash: _ipfsHash,
            userAddress: msg.sender,
            moduleLeaderAddress: _module_leader,
            timestamp: block.timestamp,
            courseId: _courseId
        });
        userSubmissions[msg.sender].push(_ipfsHash);
        courseSubmission[_courseId].push(_ipfsHash);
        userSubmission1[msg.sender][_courseId]=_ipfsHash;
         if (!userAlreadySubmitted(msg.sender)) {
            submittedUsers.push(msg.sender);
        }

        emit DocumentSubmitted(msg.sender, _ipfsHash, _courseId, block.timestamp);
    }
     function getUserSubmissions() public view returns (string[] memory) {
        return userSubmissions[msg.sender]; 
    }
	function courseSubmissions(string memory courseId) public view returns (string[] memory) {
        return courseSubmission[courseId]; 
    }
     function userAlreadySubmitted(address user) private view returns (bool) {
        for (uint256 i = 0; i < submittedUsers.length; i++) {
            if (submittedUsers[i] == user) {
                return true;
            }
        }
        return false;
    }
   function subm(string memory _ipfsHash) public view returns (string memory, address, address, uint256, string memory) {
    bytes32 hash = keccak256(bytes(_ipfsHash));
    Work memory work = submissions[hash];
    return (work.ipfsHash, work.userAddress, work.moduleLeaderAddress, work.timestamp, work.courseId);
}
    function submission(string memory courseId) public returns(string[] memory){
    string[] memory courseWorksub=new string[](submittedUsers.length);
    for (uint256 i = 0; i < submittedUsers.length; i++) {
    		address user=submittedUsers[i];
            courseWorksub[i] = userSubmission1[user][courseId];
        }

        return courseWorksub;

    }
    event DocumentSubmitted(address indexed sender, string ipfsHash, string courseId, uint256 timestamp);

}
