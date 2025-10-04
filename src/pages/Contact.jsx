import Reveal from "../components/Reveal";
import ApiService from "../services/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  User,
  HelpCircle,
  Star,
  Heart,
  AlertCircle,
  Loader,
} from "lucide-react";

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous messages
    setSubmitMessage("");
    setSubmitError("");
    setIsLoading(true);

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setSubmitError(
        "Please fill in all required fields (Name, Email, Subject, Message)"
      );
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Use environment variable for API URL
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          phone: formData.phone.trim(),
          inquiryType: formData.inquiryType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setSubmitMessage(
          data.message ||
            "Thank you for your message! We'll get back to you within 24 hours."
        );

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setSubmitMessage("");
        }, 5000);
      } else {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitError(
        error.message ||
          "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (submitError) {
      setSubmitError("");
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      contact: "+977-XX-XXXXXX",
      action: "tel:+977xxxxxxxxx",
      availability: "Mon-Fri 9AM-6PM",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      contact: "contact@ytschitwan.org",
      action: "mailto:contact@ytschitwan.org",
      availability: "24/7 Response",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick chat on WhatsApp",
      contact: "+977-XX-XXXXXX",
      action: "https://wa.me/977xxxxxxxxx",
      availability: "Instant Response",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come to our office",
      contact: "Chitwan, Nepal",
      action: "#location",
      availability: "By Appointment",
    },
  ];

  const team = [
    {
      name: "Aarav Sharma",
      role: "President",
      email: "aarav@ytschitwan.org",
      phone: "+977-XX-XXXXXX",
    },
    {
      name: "Sneha Koirala",
      role: "Vice President",
      email: "sneha@ytschitwan.org",
      phone: "+977-XX-XXXXXX",
    },
    {
      name: "Rohan Gurung",
      role: "Event Coordinator",
      email: "rohan@ytschitwan.org",
      phone: "+977-XX-XXXXXX",
    },
    {
      name: "Priya Adhikari",
      role: "PR Manager",
      email: "priya@ytschitvan.org",
      phone: "+977-XX-XXXXXX",
    },
  ];

  const faqs = [
    {
      question: "How can I join YTS Chitvan events?",
      answer:
        "You can register for our events by visiting our Events page or contacting us directly. Registration details are posted on our social media channels.",
    },
    {
      question: "Do you offer volunteering opportunities?",
      answer:
        "Yes! We welcome volunteers for our various programs. Contact our team to learn about current opportunities and how you can contribute.",
    },
    {
      question: "Can I sponsor YTS Chitvan events?",
      answer:
        "We'd love to partner with sponsors who share our mission. Reach out to discuss sponsorship packages and collaboration opportunities.",
    },
    {
      question: "How do I apply for leadership positions?",
      answer:
        "Leadership applications are typically open once a year. Follow our social media for announcements or contact us to express your interest.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-32 right-24 w-6 h-6 bg-pink-400 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">
                Let's Connect & Collaborate
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Get in
              <span className="block text-3xl md:text-4xl text-yellow-400 mt-2">
                Touch
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to{" "}
              <span className="text-yellow-300 font-semibold">
                make an impact
              </span>
              ? Whether you want to{" "}
              <span className="text-green-300 font-semibold">
                join our events
              </span>
              ,<span className="text-pink-300 font-semibold"> collaborate</span>
              , or simply learn more about our mission.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center justify-center">
              <div className="flex items-center text-yellow-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-blue-200">Always Here to Help</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                How to Reach Us
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose the method that works best for you
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <a
                  href={method.action}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group hover:transform hover:scale-105 block"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 group-hover:shadow-lg transition-all">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {method.description}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {method.contact}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {method.availability}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Reveal>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                  <Send className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                  Send us a Message
                </h3>

                {/* Success Message */}
                {isSubmitted && submitMessage && (
                  <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-200 px-4 py-3 rounded-lg mb-6 flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{submitMessage}</span>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6 flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+977-XX-XXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="events">Event Registration</option>
                      <option value="volunteering">Volunteering</option>
                      <option value="partnership">
                        Partnership/Sponsorship
                      </option>
                      <option value="media">Media Inquiry</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center group disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Contact Info & Team */}
            <div className="space-y-8">
              {/* Office Info */}
              <Reveal delay={0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                    Office Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          Address
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Bharatpur, Chitvan District
                          <br />
                          Bagmati Province, Nepal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          Office Hours
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Globe className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          Follow Us
                        </p>
                        <div className="flex space-x-3 mt-2">
                          <a
                            href="#"
                            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                          >
                            <Facebook className="w-4 h-4 text-white" />
                          </a>
                          <a
                            href="#"
                            className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                          >
                            <Twitter className="w-4 h-4 text-white" />
                          </a>
                          <a
                            href="#"
                            className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                          >
                            <Linkedin className="w-4 h-4 text-white" />
                          </a>
                          <a
                            href="#"
                            className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                          >
                            <Instagram className="w-4 h-4 text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Quick Team Contact */}
              <Reveal delay={0.4}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                    Direct Team Contact
                  </h3>

                  <div className="space-y-4">
                    {team.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">
                            {member.name}
                          </p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            {member.role}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <a
                            href={`mailto:${member.email}`}
                            className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </a>
                          <a
                            href={`tel:${member.phone}`}
                            className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                          >
                            <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Quick answers to common questions
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-start">
                    <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 ml-8 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of young leaders who have transformed their
              communities through YTS Chitvan. Your changemaker journey begins
              with a simple message.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg group"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Explore Our Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors group"
              >
                <Heart className="w-5 h-5 mr-2" />
                Learn Our Story
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
