import Reveal from "../components/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  Users,
  Calendar,
  Award,
  Globe,
  Star,
  CheckCircle,
  Quote,
  Play,
  Sparkles,
  Target,
  Heart,
  Gift,
  DollarSign,
} from "lucide-react";

export default function Home() {
  const [hoveredStat, setHoveredStat] = useState(null);

  const stats = [
    { number: "500+", label: "Youth Empowered", icon: Users },
    { number: "50+", label: "Events Organized", icon: Calendar },
    { number: "8", label: "Years Active", icon: Award },
    { number: "25+", label: "Partner Organizations", icon: Globe },
  ];

  const features = [
    {
      icon: Target,
      title: "Leadership Development",
      description:
        "Comprehensive programs designed to build confident, capable leaders who can drive positive change.",
    },
    {
      icon: Users,
      title: "Community Building",
      description:
        "Creating a vibrant network of young changemakers across Nepal through collaborative initiatives.",
    },
    {
      icon: Sparkles,
      title: "Innovation Hub",
      description:
        "Fostering creativity and innovative thinking through hackathons, workshops, and brainstorming sessions.",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Thapa",
      role: "CMUN 2024 Participant",
      content:
        "YTS Chitwan transformed my perspective on leadership. The CMUN experience gave me confidence to speak up and make a difference.",
      rating: 5,
      image: "/testimonials/rajesh.jpg",
    },
    {
      name: "Priya Sharma",
      role: "Workshop Alumna",
      content:
        "The leadership workshop helped me develop skills I use every day. I'm now leading my own community initiative!",
      rating: 5,
      image: "/testimonials/priya.jpg",
    },
  ];

  const upcomingEvents = [
    {
      title: "Innovation Hackathon",
      date: "September 2025",
      status: "Registration Open",
      image: "/events/hackathon-preview.jpg",
    },
    {
      title: "Youth Leadership Workshop",
      date: "October 2025",
      status: "Coming Soon",
      image: "/events/workshop-preview.jpg",
    },
    {
      title: "Chitwan Model United Nations",
      date: "November 2025",
      status: "Flagship Event",
      image: "/events/cmun-preview.jpg",
    },
  ];

  const InteractiveStats = ({ stats }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl group cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700"
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredStat(index)}
            onHoverEnd={() => setHoveredStat(null)}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            </div>

            {/* Icon with hover effect */}
            <motion.div
              className="text-blue-600 dark:text-blue-400 mb-6 flex justify-center"
              animate={{
                rotate: hoveredStat === index ? 360 : 0,
                scale: hoveredStat === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <stat.icon size={40} />
            </motion.div>

            {/* Animated Number */}
            <motion.div
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.1 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
            >
              {stat.number}
            </motion.div>

            <p className="text-gray-600 dark:text-gray-400 font-medium text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
              {stat.label}
            </p>

            {/* Hover indicator */}
            <motion.div
              className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-2xl"
              initial={{ width: "0%" }}
              animate={{ width: hoveredStat === index ? "100%" : "0%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                opacity: hoveredStat === index ? 0.1 : 0,
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Team Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Team Background Image */}
        <div className="absolute inset-0">
          <motion.img
            src="/yts-team-hero.jpg"
            alt="YTS Chitwan Team"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
          />

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

          {/* Animated particles overlay */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
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
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Youth Thinkers' Society
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Chitwan
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Empowering Nepal's youth through{" "}
                <span className="text-blue-300 font-semibold">
                  leadership development
                </span>
                ,{" "}
                <span className="text-purple-300 font-semibold">
                  innovation
                </span>
                , and{" "}
                <span className="text-pink-300 font-semibold">
                  impactful events
                </span>
              </motion.p>

              <motion.p
                className="text-lg md:text-xl text-blue-200 mb-10 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                8 years of empowering Nepal's future leaders
              </motion.p>

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
                    to="/events"
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-300 hover:shadow-blue-500/25"
                  >
                    Join Our Events
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    Learn More About Us
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

      {/* Interactive Stats Section - Clean spacing */}
      <section className="relative py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                8 Years of Impact
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Transforming lives across Nepal through youth leadership
              </motion.p>
            </div>
            <InteractiveStats stats={stats} />
          </Reveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                We create transformative experiences that develop confident
                leaders and drive social change
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our comprehensive approach to youth development focuses on three
                core areas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group bg-gray-50 dark:bg-gray-900 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div
                    className="text-blue-600 dark:text-blue-400 mb-6 flex justify-center"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon size={56} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-blue-600 transition-colors text-center">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors text-center leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  <motion.div
                    className="mt-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded mx-auto"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "60%" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Showcase Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Our Dynamic Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The passionate individuals driving positive change across Nepal
              </p>
            </div>

            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src="/yts-team-hero.jpg"
                alt="YTS Chitwan Team"
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-12 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-3xl font-bold mb-4">Our Leadership Team</h3>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                  Dedicated young leaders committed to empowering Nepal's youth
                  through innovative programs and transformative experiences.
                </p>
                <Link
                  to="/team"
                  className="inline-flex items-center text-blue-300 hover:text-blue-100 font-semibold text-lg transition-colors"
                >
                  Meet the Full Team
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Upcoming Events with Images */}
      <section className="py-32 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join our next transformative experiences
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Register now for our upcoming events and be part of Nepal's
                youth leadership movement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={event.image || "/events/default-event.jpg"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {event.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-300 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 mb-6 text-lg">{event.date}</p>

                    <Link
                      to="/contact"
                      className="inline-flex items-center text-blue-300 hover:text-blue-100 font-semibold text-lg transition-colors"
                    >
                      Register Now
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive Testimonials */}
      <section className="py-32 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Hear from our community of young leaders
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Success stories from participants who have transformed their
                communities through our programs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="group bg-gray-50 dark:bg-gray-900 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <div className="flex items-start space-x-6">
                    {/* Profile Image */}
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <img
                        src={
                          testimonial.image ||
                          "/testimonials/default-avatar.jpg"
                        }
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 dark:border-blue-800"
                      />
                    </motion.div>

                    <div className="flex-1">
                      <Quote className="text-blue-500 mb-4" size={32} />
                      <p className="text-gray-600 dark:text-gray-400 mb-6 italic text-lg leading-relaxed">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-blue-600 dark:text-blue-400">
                            {testimonial.role}
                          </p>
                        </div>

                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className="text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-8"
                whileHover={{ scale: 1.05 }}
              >
                Join a community of passionate young leaders committed to
                creating positive change
              </motion.h2>

              <motion.p
                className="text-xl mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your journey toward becoming a transformative leader starts
                here. Connect with like-minded individuals and make a lasting
                impact on Nepal's future.
              </motion.p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-full font-semibold text-xl shadow-2xl transition-all duration-300"
                  >
                    Get Involved
                    <ArrowRight className="ml-3" size={24} />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/donate"
                    className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-full font-semibold text-xl transition-all duration-300"
                  >
                    <Heart className="mr-3" size={24} />
                    Support Our Mission
                  </Link>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
