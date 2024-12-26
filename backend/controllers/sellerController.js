
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

const registerSeller = async (req, res) => {
  const { firstName, lastName, email, phone, password, fieldDomain, skills } = req.body;

  try {
    const sellerExists = await Seller.findOne({ email });
    if (sellerExists) {
      return res.status(400).json({ message: 'Seller already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = await Seller.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      fieldDomain,
      skills,
    });

    // Send a registration email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Successful Registration',
      text: `Dear ${firstName},\n\nThank you for registering with Creative Connects.\n\nBest Regards,\nCreative Connects Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending email: ${error.message}`);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.status(201).json(newSeller);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const signinSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error in signin:', error.message); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = { registerSeller , signinSeller };
