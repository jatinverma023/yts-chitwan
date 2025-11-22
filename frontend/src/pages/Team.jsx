import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Users,
  Award,
  Target,
  Heart,
  Mail,
  Linkedin,
  Twitter,
  ArrowRight,
  Star,
  Calendar,
  Globe,
  Sparkles,
  MessageCircle,
  Trophy,
  Lightbulb,
} from "lucide-react";

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState(null);

  const team = [
    {
      name: "Aarav Sharma",
      role: "President",
      img: "/team/aarav-sharma.jpg",
      bio: "Visionary leader with 5+ years in youth development. Passionate about creating opportunities for young changemakers across Nepal.",
      email: "aarav@ytschitwan.org",
      linkedin: "#",
      twitter: "#",
      achievements: [
        "Led 15+ major events",
        "CMUN Founder",
        "Youth Ambassador",
      ],
      joinedYear: "2019",
    },
    {
      name: "Sneha Koirala",
      role: "Vice President",
      img: "/team/sneha-koirala.jpg",
      bio: "Strategic planner and community builder. Dedicated to empowering female youth leadership and inclusive growth initiatives.",
      email: "sneha@ytschitwan.org",
      linkedin: "#",
      twitter: "#",
      achievements: [
        "Women's Leadership Advocate",
        "50+ Workshops Organized",
        "Community Impact Award",
      ],
      joinedYear: "2020",
    },
    {
      name: "Rohan Gurung",
      role: "Event Coordinator",
      img: "/team/rohan-gurung.jpg",
      bio: "Master event organizer with exceptional attention to detail. Transforms ideas into impactful experiences that inspire action.",
      email: "rohan@ytschitwan.org",
      linkedin: "#",
      twitter: "#",
      achievements: [
        "Event Excellence Award",
        "Innovation Hackathon Creator",
        "500+ Participants Managed",
      ],
      joinedYear: "2021",
    },
    {
      name: "Priya Adhikari",
      role: "PR Manager",
      img: "/team/priya-adhikari.jpg",
      bio: "Creative storyteller and brand strategist. Amplifies YTS Chitwan's mission through compelling narratives and digital engagement.",
      email: "priya@ytschitwan.org",
      linkedin: "#",
      twitter: "#",
      achievements: [
        "Digital Strategy Expert",
        "Media Partnership Builder",
        "Brand Recognition Leader",
      ],
      joinedYear: "2022",
    },
  ];

  const teamStats = [
    { number: "4", label: "Core Leaders", icon: Users },
    { number: "15+", label: "Team Members", icon: Globe },
    { number: "8", label: "Years Experience", icon: Calendar },
    { number: "25+", label: "Awards Won", icon: Trophy },
  ];

  const values = [
    {
      icon: Target,
      title: "Vision-Driven Leadership",
      description:
        "We lead with clear purpose and unwavering commitment to youth empowerment.",
    },
    {
      icon: Heart,
      title: "Passion for Impact",
      description:
        "Every team member brings genuine passion for creating positive social change.",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description:
        "We embrace new ideas and innovative approaches to solve complex challenges.",
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description:
        "Our strength lies in our ability to work together toward common goals.",
    },
  ];

  const TeamMemberCard = ({ member, index }) => {
    const isHovered = hoveredMember === index;

    return (
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group"
        whileHover={{ y: -5, scale: 1.02 }}
        onHoverStart={() => setHoveredMember(index)}
        onHoverEnd={() => setHoveredMember(null)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
      >
        {/* Member Image & Basic Info */}
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className="relative">
              <motion.img
                src={member.img || "/team/default-avatar.jpg"}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 dark:border-purple-700"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-6 flex-1">
              <motion.h3
                className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-purple-600 transition-colors"
                whileHover={{ x: 5 }}
              >
                {member.name}
              </motion.h3>
              <div className="flex items-center mb-2">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {member.role}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Team Member Since {member.joinedYear}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {member.bio}
          </p>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              Key Achievements
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.achievements.map((achievement, idx) => (
                <motion.span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {achievement}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex items-center justify-between pt-6 border-t dark:border-gray-700">
            <div className="flex space-x-3">
              <motion.a
                href={`mailto:${member.email}`}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={member.linkedin}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={member.twitter}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
            <motion.button
              className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Connect
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Team Image Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Team Background Image */}
        <div className="absolute inset-0">
          <motion.img
            src="/team-achievement-banner.jpg" // Your new screenshot
            alt="YTS Chitwan Team Achievement"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
          />

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/70 to-indigo-900/80"></div>

          {/* Animated particles overlay */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400/40 rounded-full"
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1200),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 800),
                }}
                animate={{
                  y: [null, -100, null],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-lg font-medium">
                  Meet the Changemakers
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our Leadership
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400">
                  Team
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Passionate leaders driving Nepal's youth empowerment movement
                through{" "}
                <span className="text-yellow-300 font-semibold">
                  innovation
                </span>
                ,{" "}
                <span className="text-green-300 font-semibold">dedication</span>
                , and{" "}
                <span className="text-pink-300 font-semibold">
                  collaborative spirit
                </span>
              </motion.p>

              <motion.div
                className="flex items-center justify-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center text-yellow-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                  <span className="ml-3 text-blue-200 text-lg">
                    Recognized Excellence in Youth Leadership
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-300"
                  >
                    Join Our Team
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center border-2 border-white/80 text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    Our Story
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Team Stats Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Leadership Excellence
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our team's collective impact and achievements in youth
                empowerment
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {teamStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-6 group-hover:shadow-2xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-32 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Meet Our Leaders
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The passionate individuals driving positive change across Nepal
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {team.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Our Leadership Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The core principles that guide our team's approach to youth
                empowerment and social change
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-full mb-6 group-hover:shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-purple-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-32 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-8"
              whileHover={{ scale: 1.05 }}
            >
              Want to Join Our Team?
            </motion.h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're always looking for passionate individuals who want to make a
              difference in Nepal's youth community. Join us in creating
              positive change and developing the next generation of leaders!
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-10 py-5 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-2xl"
                >
                  Apply to Join
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center px-10 py-5 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Learn About Us
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
