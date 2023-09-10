import React from 'react';

class Logout extends React.Component {
  handleLogout = () => {
    // Implement your logout logic here, such as clearing tokens, sessions, etc.
    // For example, you might use localStorage or sessionStorage to store tokens.
    localStorage.removeItem('authToken'); // Clear the authentication token

    // Redirect the user to the login or home page
    window.location.href = '/'; // Replace with your login page URL
  };

  render() {
    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}
export default Logout;
