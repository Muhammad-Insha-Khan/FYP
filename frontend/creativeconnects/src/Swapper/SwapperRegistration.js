import React, { useState } from 'react';
import '../styles/SwapperRegistration.css';
import 'react-phone-input-2/lib/style.css'; // Import styles for react-phone-input-2
import PhoneInput from 'react-phone-input-2';
import Swal from 'sweetalert2'; // Import SweetAlert2

function SwapperRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    expertiseHave: [],
    expertiseLookingFor: [],
    expertiseToAddHave: '',
    expertiseToAddLookingFor: ''
  });

  // List of available expertise options
  const expertiseOptions = [
    'Web Development', 'Graphic Design', 'App Development', 'Technical Support', 'SEO',
    'Data Analysis', 'Marketing', 'Photography', 'Project Management', 'UI/UX Design',
    'Copywriting', 'Blockchain', 'AI & Machine Learning', 'Business Strategy', 'Video Editing'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddExpertiseHave = () => {
    const selectedExpertise = formData.expertiseToAddHave;
    if (formData.expertiseHave.length < 5 && selectedExpertise && !formData.expertiseHave.includes(selectedExpertise)) {
      setFormData({
        ...formData,
        expertiseHave: [...formData.expertiseHave, selectedExpertise],
        expertiseToAddHave: '' // Clear the input after adding
      });
      Swal.fire({
        icon: 'success',
        title: 'Expertise Added',
        text: 'You have successfully added expertise.',
      });
    } else if (formData.expertiseHave.length >= 5) {
      Swal.fire({
        icon: 'error',
        title: 'Limit Exceeded',
        text: 'You can only select up to 5 expertise.',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Expertise',
        text: 'Please select a valid expertise.',
      });
    }
  };

  const handleAddExpertiseLookingFor = () => {
    const selectedExpertise = formData.expertiseToAddLookingFor;
    if (formData.expertiseLookingFor.length < 5 && selectedExpertise && !formData.expertiseLookingFor.includes(selectedExpertise)) {
      setFormData({
        ...formData,
        expertiseLookingFor: [...formData.expertiseLookingFor, selectedExpertise],
        expertiseToAddLookingFor: '' // Clear the input after adding
      });
      Swal.fire({
        icon: 'success',
        title: 'Expertise Added',
        text: 'You have successfully added expertise.',
      });
    } else if (formData.expertiseLookingFor.length >= 5) {
      Swal.fire({
        icon: 'error',
        title: 'Limit Exceeded',
        text: 'You can only select up to 5 expertise.',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Expertise',
        text: 'Please select a valid expertise.',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/skillswapper/register', { // Update the URL based on your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: result.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'An error occurred during registration',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };
  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      expertiseHave: [],
      expertiseLookingFor: [],
      expertiseToAddHave: '',
      expertiseToAddLookingFor: ''
    });
  };

  return (
    <div className="Swapper-container">
      <div className="Swapper-col1">
        <h1>Welcome to Creative Connects</h1>
        <p>Connect with others by swapping your skills and finding the expertise you're looking for.</p>
      </div>
      <div className="Swapper-col2">
        <h1>SkillSwapper Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="Swapper-input-row">
            <div className="Swapper-input-half">
              <label htmlFor="f-name">First Name</label>
              <input
                type="text"
                id="f-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Swapper-input-half">
              <label htmlFor="l-name">Last Name</label>
              <input
                type="text"
                id="l-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="Swapper-input-row">
            <div className="Swapper-input-half">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Buyer-input-half">
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                country="pk" // Default country
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
                enableSearch
              />
            </div>
          </div>

          <div className="Swapper-input-row">
            <div className="Swapper-input-half">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Swapper-input-half">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="expertise-have">Expertise You Have</label>
          <select
            id="expertise-have"
            name="expertiseToAddHave"
            value={formData.expertiseToAddHave || ''}
            onChange={(e) => setFormData({ ...formData, expertiseToAddHave: e.target.value })}
            required
          >
            <option value="">Select expertise</option>
            {expertiseOptions.map((expertise, index) => (
              <option key={index} value={expertise}>
                {expertise}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddExpertiseHave} className="Swapper-add-button">Add</button>
          <p>Expertise You Have: {formData.expertiseHave.join(', ')}</p>

          <label htmlFor="expertise-looking-for">Expertise You Are Looking For</label>
          <select
            id="expertise-looking-for"
            name="expertiseToAddLookingFor"
            value={formData.expertiseToAddLookingFor || ''}
            onChange={(e) => setFormData({ ...formData, expertiseToAddLookingFor: e.target.value })}
            required
          >
            <option value="">Select expertise</option>
            {expertiseOptions.map((expertise, index) => (
              <option key={index} value={expertise}>
                {expertise}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddExpertiseLookingFor} className="Swapper-add-button">Add</button>
          <p>Expertise You Are Looking For: {formData.expertiseLookingFor.join(', ')}</p>

          <div className="Swapper-button-row">
            <button type="submit" className="Swapper-submit">Register</button>
            <button type="button" className="Swapper-clear" onClick={handleClear}>
              <span className="Swapper-clear-icon">×</span> Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SwapperRegistration;
