contract User{
	//smart contract goes here
	struct User{
	   string name;
        string username;
        string password;
        string email;
        address ethAddress;
        uint256 universityId;
        boolean isActive;

	}


	map(address=>User) public users;

	function adduser(string memory name
	string memory password
	string memory email
	address memory ethAddress
	uint256 universityId)public {
	 require(users[_ethAddress].ethAddress == address(0), "User already registered");
	 User memory newUser = User({
            name: _name,
            username: _username,
            password: _password,
            email: _email,
            ethAddress: newUserAddress,
            universityId: _universityId
             isActive: true

        });

        users[newUserAddress] = newUser;
	}

	