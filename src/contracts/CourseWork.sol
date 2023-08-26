pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

contract CourseWork {
    struct Coursework {
        string courseWorkName;
        address moduleLeaderAddress;
        string courseworkId;
        uint256 timestamp;
        string courseName;
    }

    mapping(string => Coursework) private work;
    mapping(string => bool) private courseWorkId;
    mapping(string => string[]) private courseWorkKeys;
    mapping(string => mapping(string => Coursework)) private courseWorkList;
    mapping(address => string[]) private modCourseWork;
    function submitCoursework(
        string memory _courseWorkName,
        address _moduleLeaderAddress,
        string memory _courseworkId,
        string memory _courseName
    ) public {
        require(!courseWorkId[_courseworkId], "Coursework ID exists");
        courseWorkId[_courseworkId] = true;

        Coursework memory newCoursework = Coursework({
            courseWorkName: _courseWorkName,
            moduleLeaderAddress: _moduleLeaderAddress,
            courseworkId: _courseworkId,
            timestamp: block.timestamp,
            courseName: _courseName
        });

        work[_courseworkId] = newCoursework;
        courseWorkList[_courseName][_courseworkId] = newCoursework;
        courseWorkKeys[_courseName].push(_courseworkId);
        modCourseWork[_moduleLeaderAddress].push(_courseworkId);
       
        emit DocumentSubmitted(msg.sender, _courseworkId, _courseName, block.timestamp);
    }

    function getCourseworkList(string memory _courseName) public view returns (Coursework[] memory) {
        string[] memory keys = courseWorkKeys[_courseName];
        Coursework[] memory courseworkArray = new Coursework[](keys.length);

        for (uint256 i = 0; i < keys.length; i++) {
            courseworkArray[i] = courseWorkList[_courseName][keys[i]];
        }

        return courseworkArray;
    }
     
  function getModCourseWork(address _moduleLeaderAddress) public view returns (string[] memory) {
   string[] memory courseworkIds = modCourseWork[_moduleLeaderAddress];
   return courseworkIds;
   }

    event DocumentSubmitted(
        address indexed sender,
        string courseworkId,
        string courseName,
        uint256 timestamp
    );
}