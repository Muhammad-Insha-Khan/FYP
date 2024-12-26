import React, { useState } from 'react';
import InputField from '../components/InputField';
import Botton from '../components/Botton';
import '../styles/Signin.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('skillSwapper'); // Default to SkillSwapper
  const navigate = useNavigate();

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Define the API URL based on user type
    const apiUrl =
      userType === 'seller'
        ? 'http://localhost:5000/api/seller/signin'
        : userType === 'buyer'
        ? 'http://localhost:5000/api/buyer/signin'
        : 'http://localhost:5000/api/skillSwapper/signin'; // SkillSwapper sign-in URL

    try {
      // Send POST request to the back-end for sign-in
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store JWT token in localStorage

        Swal.fire({
          title: 'Success!',
          text: 'You are now logged in!',
          icon: 'success',
          confirmButtonText: 'Go to Dashboard',
        }).then(() => {
          // Navigate to different dashboards based on user type
          if (userType === 'seller') {
            navigate('/SellerDashboard');
          } else if (userType === 'buyer') {
            navigate('/BuyerDashboard');
          } else {
            navigate('/BuyerDashboard'); // Redirect to Skill Swapper dashboard
          }
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Something went wrong, please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Server Error!',
        text: 'An error occurred, please try again later.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <div className="sign">
      <div className="floating-circle"></div>
      <div className="container">
        <div className="col1">
          <h1>WELCOME TO CREATIVE CONNECT!</h1>
          <p>
            Connect with top talent, find exciting projects, or swap skills with
            other professionals. Join us to build partnerships and turn ideas into
            reality.
          </p>
          <Botton type="button" onClick={() => navigate('/register')}>
            Register Now
          </Botton>
        </div>
        <div className="col2">
          <h1>Sign in to your account</h1>

          {/* User Type Selection */}
          <label>
            <input
              type="radio"
              checked={userType === 'buyer'}
              onChange={() => setUserType('buyer')} // Set user type to 'Buyer'
            />
            Buyer
          </label>
          <label>
            <input
              type="radio"
              checked={userType === 'seller'}
              onChange={() => setUserType('seller')} // Set user type to 'Seller'
            />
            Seller
          </label>
          <label>
            <input
              type="radio"
              checked={userType === 'skillSwapper'}
              onChange={() => setUserType('skillSwapper')} // Set user type to 'SkillSwapper'
            />
            Skill Swapper
          </label>

          <InputField
            type="email"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            Enter your Email
          </InputField>
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            Enter your Password
          </InputField>
          <div className="submit"></div>
          <Botton className="signin-button" type="submit" onClick={handleSignIn}>
            Sign in
          </Botton>
          <p>
            By joining, you agree to the Creative Connect Terms of Service and to
            occasionally receive emails from us. Please read our Privacy Policy to
            learn how we use your personal data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
