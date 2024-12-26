const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Buyer = require('../models/Buyer');

const registerBuyer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, fieldDomain, interests } = req.body;

    // Check for existing user
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Create new buyer
    const newBuyer = await Buyer.create({ firstName, lastName, email, phone, password, fieldDomain, interests });

    // Generate token
    const token = jwt.sign({ id: newBuyer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'Registration successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const signinBuyer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if buyer exists
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: buyer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Sign-in successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerBuyer, signinBuyer };
