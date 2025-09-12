import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Heart,
  Users,
  Target,
  Gift,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  Calendar,
  Globe,
} from "lucide-react";

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const impactAreas = [
    {
      icon: Users,
      title: "Leadership Training",
      description:
        "Sponsor complete leadership development program for one youth",
      amount: "₹5,000",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Target,
      title: "CMUN Participation",
      description: "Fund workshop materials and participation for 10 students",
      amount: "₹10,000",
      color: "from-green-500 to-blue-600",
    },
    {
      icon: Gift,
      title: "Scholarship Support",
      description: "Provide event access for underprivileged youth",
      amount: "₹2,500",
      color: "from-purple-500 to-pink-600",
    },
  ];

  const donationAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "esewa", name: "eSewa", icon: null },
    { id: "khalti", name: "Khalti", icon: null },
    { id: "bank", name: "Bank Transfer", icon: null },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation submission
    alert(
      "Thank you for your generous donation! We will process your contribution and send you a receipt."
    );
  };

  const handleInputChange = (e) => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value,
    });
  };

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
                Make a Difference Today
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Invest in Nepal's
              <span className="block text-3xl md:text-4xl text-yellow-400 mt-2">
                Future Leaders
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your contribution directly empowers young changemakers across
              Nepal through
              <span className="text-yellow-300 font-semibold">
                {" "}
                leadership programs
              </span>
              ,<span className="text-green-300 font-semibold"> events</span>,
              and
              <span className="text-pink-300 font-semibold">
                {" "}
                community initiatives
              </span>
              .
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center justify-center">
              <div className="flex items-center text-yellow-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-blue-200">500+ Lives Changed</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Where Your Donation Makes Impact
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See exactly how your contribution transforms lives
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {impactAreas.map((area, index) => (
              <Reveal key={index} delay={index * 0.2}>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 group hover:transform hover:scale-105">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${area.color} rounded-full mb-6 group-hover:shadow-lg transition-all`}
                  >
                    <area.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {area.amount}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 flex items-center justify-center">
                <Heart className="w-6 h-6 mr-3 text-red-500" />
                Make Your Donation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Amount Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Choose Amount (NPR)
                  </h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount.toString());
                          setCustomAmount("");
                        }}
                        className={`p-3 border-2 rounded-lg font-semibold transition-all ${
                          selectedAmount === amount.toString()
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                            : "border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900"
                        }`}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Custom Amount (NPR)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount("");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Donor Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={donorInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={donorInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={donorInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="+977-XX-XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={donorInfo.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                    placeholder="Any message or dedication..."
                  ></textarea>
                </div>

                {/* Payment Methods */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Payment Method
                  </h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${
                          paymentMethod === method.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                            : "border-gray-300 dark:border-gray-600 hover:border-blue-500"
                        }`}
                      >
                        {method.icon && (
                          <method.icon className="w-5 h-5 mr-2" />
                        )}
                        <span className="font-medium">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  <span>Your donation is secure and encrypted</span>
                </div>

                {/* Donate Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center text-lg group"
                >
                  <Heart className="w-6 h-6 mr-2" />
                  Complete Donation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Thank You / Impact Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Thank You for Your Support!
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Your generosity helps us continue empowering Nepal's youth.
              Together, we're building a brighter future.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                <Globe className="w-5 h-5 mr-2" />
                See Our Impact
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-xl font-semibold transition-colors"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
