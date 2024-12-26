const mongoose = require('mongoose');

// Define the schema for SkillSwapper users
const skillSwapperSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  expertiseHave: { type: [String], default: [] },
  expertiseLookingFor: { type: [String], default: [] },
});

// Create the model based on the schema
const SkillSwapper = mongoose.model('SkillSwapper', skillSwapperSchema);

module.exports = SkillSwapper;
