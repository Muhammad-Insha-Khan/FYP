const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const buyerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  fieldDomain: { type: String, required: true },
  interests: { type: [String], required: true },
}, { timestamps: true });

// Hash password before saving
buyerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Buyer', buyerSchema);
