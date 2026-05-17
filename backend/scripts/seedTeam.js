const mongoose = require('mongoose');
require('dotenv').config();
const TeamMember = require('../models/TeamMember');

const seedTeam = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing
    await TeamMember.deleteMany({});
    
    // Insert new data based on Team.jsx
    await TeamMember.insertMany([
      {
        name: "Aarav Sharma",
        position: "President",
        image: "/team/aarav-sharma.jpg",
        bio: "Visionary leader with 5+ years in youth development. Passionate about creating opportunities for young changemakers across Nepal.",
        email: "aarav@ytschitwan.org",
        social: {
          linkedin: "#",
          twitter: "#"
        },
        order: 1
      },
      {
        name: "Sneha Koirala",
        position: "Vice President",
        image: "/team/sneha-koirala.jpg",
        bio: "Strategic planner and community builder. Dedicated to empowering female youth leadership and inclusive growth initiatives.",
        email: "sneha@ytschitwan.org",
        social: {
          linkedin: "#",
          twitter: "#"
        },
        order: 2
      },
      {
        name: "Rohan Gurung",
        position: "Event Coordinator",
        image: "/team/rohan-gurung.jpg",
        bio: "Master event organizer with exceptional attention to detail. Transforms ideas into impactful experiences that inspire action.",
        email: "rohan@ytschitwan.org",
        social: {
          linkedin: "#",
          twitter: "#"
        },
        order: 3
      },
      {
        name: "Priya Adhikari",
        position: "PR Manager",
        image: "/team/priya-adhikari.jpg",
        bio: "Creative storyteller and brand strategist. Amplifies YTS Chitwan's mission through compelling narratives and digital engagement.",
        email: "priya@ytschitwan.org",
        social: {
          linkedin: "#",
          twitter: "#"
        },
        order: 4
      }
    ]);
    
    console.log('✅ Team Seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding team:', error);
    process.exit(1);
  }
};

seedTeam();
