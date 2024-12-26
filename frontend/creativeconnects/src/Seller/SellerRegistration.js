import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css'; // Import styles for react-phone-input-2
import PhoneInput from 'react-phone-input-2';
import Swal from 'sweetalert2';
import '../styles/SellerRegistration.css';

const SellerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fieldDomain: '',
    skills: [],
    skillToAdd: '',
  });

  const fieldDomains = [
    'IT', 'Software Development', 'Technician', 'Design', 'Business'
  ];

  const skills = [
    'Web Development', 'Graphic Design', 'App Development', 'Technical Support',
    'SEO', 'Data Analysis', 'Marketing', 'Photography', 'Project Management', 'UI/UX Design'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    const selectedSkill = formData.skillToAdd;
    
    if (!selectedSkill) {
      Swal.fire({
        title: 'Invalid Selection',
        text: 'Please select a valid interest to add.',
        icon: 'error',
        background: '#00796b',
        color: 'white',
      });
      return;
    }

    if (formData.skills.length < 3 && selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, selectedSkill],
        skillToAdd: '',
      });
    }else if (formData.skills.length >= 3) {
      Swal.fire({
        title: 'Limit Reached',
        text: 'You can only select up to 3 interests.',
        icon: 'warning',
        background: '#00796b',
        color: 'white',
      });
    } else {
      Swal.fire({
        title: 'Duplicate Skills',
        text: 'This interest has already been added.',
        icon: 'error',
        background: '#00796b',
        color: 'white',
      });
    }
  };
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        icon: 'error',
        background: '#00796b',
        color: '#4caf50',
      });
      return false;
    }

    if (!formData.email.includes('@')) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        background: '#00796b',
        color: '#4caf50',
      });
      return false;
    }

    return true;
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/sellers/register', {
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: 'Success',
        text: 'Registration successful. Check your email for confirmation.',
        icon: 'success',
        background: '#00796b',
        color: 'white',
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        fieldDomain: '',
        skills: [],
        skillToAdd: '',
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: data.message,
        icon: 'error',
        background: '#00796b',
        color: 'white',
      });
    }
  } catch (error) {
    console.error('Error:', error);
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
      fieldDomain: '',
      skills: [],
      skillToAdd: '',
    });

    Swal.fire({
      title: 'Form Cleared',
      text: 'All input fields have been reset.',
      icon: 'info',
      background: '#00796b',
      color: 'white',
    });
  };

  const handleBack = () => {
    // This could redirect to the previous page or reset the form without reload
    window.location.reload(); // Go back to the previous page without a page reload
  };

  return (
    <div className="Seller-container">
      <div className="Seller-col1">
        <h1>Welcome to Creative Connects</h1>
        <p>Join a vibrant community where your expertise meets new opportunities. Share and grow your skills.</p>
        <button className="Sellerback" onClick={handleBack}>Back</button>
      </div>
      <div className="Seller-col2">
        <h1>Seller Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="Seller-input-row">
            <div className="Seller-input-half">
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
            <div className="Seller-input-half">
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

          <div className="Seller-input-row">
            <div className="Seller-input-half">
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
            <div className="Seller-input-half">
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                country="pk"
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

          <div className="Seller-input-row">
            <div className="Seller-input-half">
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
            <div className="Seller-input-half">
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

          <label htmlFor="field-domain">Field Domain</label>
          <select
            id="field-domain"
            name="fieldDomain"
            value={formData.fieldDomain}
            onChange={handleChange}
            required
          >
            <option value="">Select a field domain</option>
            {fieldDomains.map((domain, index) => (
              <option key={index} value={domain}>
                {domain}
              </option>
            ))}
          </select>

          <label htmlFor="skills">Select a Skill</label>
          <select
            id="skills"
            name="skills"
            value={formData.skillToAdd || ''}
            onChange={(e) => setFormData({ ...formData, skillToAdd: e.target.value })}
            required
          >
            <option value="">Select a skill</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddSkill}>Add Skill</button>
          <p>Selected Skills: {formData.skills.join(', ')}</p>

          <div className="button-row">
            <button type="submit" className="Seller-submit">Register</button>
            <button type="button" className="Seller-clear" onClick={handleClear}>
              <span className="clear-icon">×</span> Clear
            </button>
          </div>
        </form>
      </div>
      
      <div className="floating-circle"></div>
    </div>
  );
};

export default SellerRegistration;
