import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  Heart,
  Award,
  Globe,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
} from "lucide-react";

export default function About() {
  const stats = [
    { number: "500+", label: "Youth Empowered", icon: Users },
    { number: "50+", label: "Events Organized", icon: Calendar },
    { number: "8", label: "Years Active", icon: Award },
    { number: "25+", label: "Partner Organizations", icon: Globe },
  ];

  const values = [
    {
      icon: Target,
      title: "Leadership Excellence",
      description:
        "We cultivate confident leaders who drive positive change in their communities.",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description:
        "We encourage innovative thinking and creative solutions to real-world challenges.",
    },
    {
      icon: Heart,
      title: "Social Impact",
      description:
        "Every program we run is designed to create meaningful impact in society.",
    },
    {
      icon: Users,
      title: "Inclusive Community",
      description:
        "We believe in creating an inclusive space where every voice matters.",
    },
  ];

  const achievements = [
    "Successfully organized 8 editions of Chitvan Model United Nations",
    "Trained over 500 young leaders across Nepal",
    "Established partnerships with 25+ national and international organizations",
    "Recognized as 'Outstanding Youth Organization' by Nepal Youth Council",
    "Featured in major Nepali media outlets for our community impact",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Nepal's
              <span className="text-yellow-400"> Future Leaders</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Youth Thinkers' Society (YTS) Chitwan has been nurturing young
              changemakers for over 8 years, creating a legacy of leadership and
              social impact across Nepal.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex items-center justify-center text-lg text-blue-200">
              <MapPin className="w-5 h-5 mr-2" />
              Based in Chitwan, Impacting All of Nepal
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
              Our Impact in Numbers
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <Reveal>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To create a dynamic platform where young Nepalese leaders can
                  develop essential skills, engage in meaningful dialogue, and
                  drive positive change in their communities through innovative
                  programs, workshops, and collaborative initiatives.
                </p>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-6">
                  <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To be Nepal's premier youth organization, recognized for
                  developing confident, socially-conscious leaders who
                  contribute to building a more prosperous, inclusive, and
                  sustainable Nepal for future generations.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
              What Drives Us
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Our core values shape every decision we make and every program we
              create
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 group-hover:shadow-lg">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
              Our Achievements
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
              Milestones that reflect our commitment to youth empowerment
            </p>
          </Reveal>

          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="flex items-start bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1 mr-4" />
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {achievement}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Support Our Mission Section - NEW */}
      <section className="py-16 px-6 bg-blue-50 dark:bg-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Help Us Continue This Impact
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Your donation directly supports our programs that have empowered
              500+ youth leaders across Nepal. Every contribution creates
              lasting change in communities.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  ₹2,500
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  One leadership workshop participant
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  ₹5,000
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Complete CMUN experience
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  ₹10,000
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Community outreach program
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <Link
              to="/donate"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 group"
            >
              <Heart className="w-5 h-5 mr-2" />
              Support Our Mission
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl mb-8 text-blue-100">
              Be part of a movement that's shaping Nepal's future through youth
              leadership and innovation.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center group"
              >
                Explore Our Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
