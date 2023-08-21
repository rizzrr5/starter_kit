pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

contract User {
    uint256 public userCount;
    struct UserStruct {
        string name;
        string username;
        bytes32 passwordHash;
        address ethAddress;
        uint256 universityId;
        bool isActive;
        string courseName;
        string role;
    }
    address[] public userAddresses;
    mapping(address => UserStruct) public users;
    mapping(uint256 => bool) public universityIdExists;

    function addUser(
        string memory _name,
        string memory _password,
        address _ethAddress,
        uint256 _universityId,
        string memory _courseName,
        string memory _role
    ) public {
        require(users[_ethAddress].ethAddress == address(0), "User already registered");
        require(!universityIdExists[_universityId], "University ID already registered");

        universityIdExists[_universityId] = true;
        
        bytes32 hashedPassword = keccak256(bytes(_password));
        
        UserStruct memory newUser = UserStruct({
            name: _name,
            username: _name,
            passwordHash: hashedPassword,
            ethAddress: _ethAddress,
            universityId: _universityId,
            role:_role,
            courseName:_courseName,
            isActive: true
        });
        userAddresses.push(_ethAddress);
        users[_ethAddress] = newUser;
        userCount=userCount+1;
    }

    function getUser(string memory _name, string memory _password, address _ethAddress) public view returns (bool) {
        bytes32 hash = keccak256(bytes(_password));
        string memory nm = _name;
        
        return (
            users[_ethAddress].ethAddress != address(0)&&
            users[_ethAddress].passwordHash == hash
        );
        
    }
    function getRole(address _ethAddress) public view returns (string memory){
    require(users[_ethAddress].ethAddress !=address(0),"USer doesn't exist");
    return users[_ethAddress].role;
    }
          function getAllUsers() public view returns (UserStruct[] memory) {
        UserStruct[] memory allUsers = new UserStruct[](userAddresses.length);
        
        for (uint256 index = 0; index < userAddresses.length; index++) {
            address userAddress = userAddresses[index];
            if (users[userAddress].ethAddress != address(0) && users[userAddress].isActive) {
                allUsers[index] = users[userAddress];
            }
        }

        return allUsers;
    }
    function deleteUser(address _ethAddress) public{
    require(users[_ethAddress].ethAddress != address(0));
  //      users[_ethAddress].ethAddress = 0x0;
        users[_ethAddress].passwordHash = 0x0; 
        users[_ethAddress].isActive = false; 
    }



}