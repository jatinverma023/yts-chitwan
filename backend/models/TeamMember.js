const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  position: {
    type: String,
    required: true,
    maxlength: 100
  },
  bio: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: '',
    maxlength: 255
  },
  email: {
    type: String,
    default: '',
    maxlength: 100
  },
  social: {
    type: Object,
    default: {}
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
