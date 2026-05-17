const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const email = 'admin@ytschitwan.org';
    const password = 'adminpassword123';

    // Check if admin already exists
    let admin = await User.findOne({ email });
    
    if (admin) {
      console.log('✅ Admin user already exists!');
      console.log('Email:', email);
      console.log('Password is unchanged.');
    } else {
      // Create new admin
      admin = new User({
        name: 'Super Admin',
        email,
        password, // User schema pre-save hook will hash this
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully!');
      console.log('Email:', email);
      console.log('Password:', password);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
