import Reveal from "../components/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    },
    {
      name: "Priya Sharma",
      role: "Workshop Alumna",
      content:
        "The leadership workshop helped me develop skills I use every day. I'm now leading my own community initiative!",
      rating: 5,
    },
  ];

  const upcomingEvents = [
    {
      title: "Innovation Hackathon",
      date: "September 2025",
      status: "Registration Open",
    },
    {
      title: "Youth Leadership Workshop",
      date: "October 2025",
      status: "Coming Soon",
    },
    {
      title: "Chitwan Model United Nations",
      date: "November 2025",
      status: "Flagship Event",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-yellow-400 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-5 h-5 bg-pink-400 rounded-full opacity-30 animate-bounce"></div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6">
          <Reveal>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-300">
                  Nepal's Premier Youth Organization
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Youth Thinkers' Society
                <span className="block text-3xl md:text-4xl lg:text-5xl text-blue-400 mt-2">
                  Chitwan
                </span>
              </h1>
            </motion.div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-8 max-w-3xl mx-auto">
              Empowering Nepal's youth through{" "}
              <span className="font-semibold text-blue-400">
                leadership development
              </span>
              ,{" "}
              <span className="font-semibold text-purple-400">innovation</span>,
              and{" "}
              <span className="font-semibold text-green-400">
                impactful events
              </span>
              .
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-gray-300">500+ Success Stories</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/events"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg transition-all duration-300 group"
                >
                  Explore Events
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl font-semibold shadow-lg transition-all duration-300 border border-white/30"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Our Story
                </Link>
              </motion.div>
            </div>
          </Reveal>

          {/* Scroll Indicator */}
          <Reveal delay={0.6}>
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Our Impact Speaks
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                8 years of empowering Nepal's future leaders
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <motion.div
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 group-hover:shadow-lg transition-all">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                What We Do
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We create transformative experiences that develop confident
                leaders and drive social change
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Reveal key={index} delay={index * 0.2}>
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Upcoming Events
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Join our next transformative experiences
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                to="/events"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
              >
                View All Events
                <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      event.status === "Registration Open"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : event.status === "Flagship Event"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {event.status}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {event.date}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Hear from our community of young leaders
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.2}>
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-50" />
                    <div className="flex ml-auto">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* Donation Impact Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Your Support Creates Impact
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Every donation directly empowers young leaders across Nepal.
                  See how your contribution makes a difference.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">₹2,500</div>
                      <div className="text-blue-200">
                        Sponsors one student for leadership workshop
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">₹5,000</div>
                      <div className="text-blue-200">
                        Funds complete CMUN participation
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">₹10,000</div>
                      <div className="text-blue-200">
                        Organizes community outreach program
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/donate"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg group"
                >
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Make an Impact Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Recent Impact
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      500+
                    </div>
                    <div className="text-blue-200">Youth Leaders Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      ₹50,000+
                    </div>
                    <div className="text-blue-200">Donated This Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      25+
                    </div>
                    <div className="text-blue-200">Scholarship Recipients</div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm text-blue-100 italic text-center">
                    "Thanks to donor support, I was able to attend CMUN and now
                    I'm leading my own community project!"
                    <span className="block mt-2 font-medium">
                      - Maya, 2024 Participant
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Shape Nepal's Future?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join a community of passionate young leaders committed to creating
              positive change. Your journey starts here.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg group"
              >
                Join Our Community
                <Heart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore Opportunities
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
