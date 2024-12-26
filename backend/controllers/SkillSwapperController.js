const SkillSwapper = require('../models/SkillSwapper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // For sending email

// User Registration
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, expertiseHave, expertiseLookingFor } = req.body;

    // Check if the user already exists
    const existingUser = await SkillSwapper.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new SkillSwapper({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      expertiseHave,
      expertiseLookingFor
    });

    await newUser.save();

    // Send email after successful registration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or any other service
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password' // You can use environment variables for security
      }
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Registration Successful',
      text: `Hello ${firstName},\n\nThank you for registering with Creative Connects! We're excited to have you on board.\n\nBest regards,\nCreative Connects Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

const signinSkillSwapper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SkillSwapper.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password with hashed password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser , signinSkillSwapper };
