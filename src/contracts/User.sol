pragma solidity 0.5.0;

contract User {
    struct UserStruct {
        string name;
        string username;
        bytes32 passwordHash;
        address ethAddress;
        uint256 universityId;
        bool isActive;
    }

    mapping(address => UserStruct) public users;
    mapping(uint256 => bool) public universityIdExists;

    function addUser(
        string memory _name,
        string memory _password,
        address _ethAddress,
        uint256 _universityId
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
            isActive: true
        });

        users[_ethAddress] = newUser;
    }

    function getUser(string memory _name, string memory _password, address _ethAddress) public view returns (bool) {
        bytes32 hash = keccak256(bytes(_password));
        string memory nm = _name;
        
        return (
            users[_ethAddress].ethAddress != address(0)&&
            users[_ethAddress].passwordHash == hash
        );
        
    }
}