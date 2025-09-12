import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { Calendar, Users, ArrowRight, Mail, Heart } from "lucide-react";

export default function Events() {
  const events = [
    {
      title: "Chitwan Model United Nations (CMUN)",
      date: "November 2025",
      description:
        "Our flagship event bringing youth from across Nepal together for debate, diplomacy, and leadership.",
      status: "Registration Opening Soon",
      contactEmail: "cmun@ytschitwan.org",
      registrationLink: "/contact",
      isHighlighted: true, // flagship event
    },
    {
      title: "Youth Leadership Workshop",
      date: "October 2025",
      description:
        "A workshop designed to empower young leaders with practical skills and confidence.",
      status: "Registration Open",
      contactEmail: "workshop@ytschitwan.org",
      registrationLink: "/contact",
      isHighlighted: false,
    },
    {
      title: "Innovation Hackathon",
      date: "September 2025",
      description:
        "A collaborative platform for youth to develop innovative solutions to real-world challenges.",
      status: "Registration Open",
      contactEmail: "hackathon@ytschitwan.org",
      registrationLink: "/contact",
      isHighlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

        {/* Content */}
        <div className="relative z-10 px-6">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming Events
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Discover programs, workshops, and initiatives designed to inspire
              and empower youth leaders in Chitwan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Event Cards */}
      <section className="py-16 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <Reveal key={index} delay={index * 0.2}>
              <div
                className={`bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
                  event.isHighlighted
                    ? "ring-2 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
              >
                {/* Event Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      {event.title}
                      {event.isHighlighted && (
                        <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                          Flagship
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </div>
                  </div>
                </div>

                {/* Event Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {event.description}
                </p>

                {/* Registration Status */}
                <div className="flex items-center mb-4">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === "Registration Open"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        event.status === "Registration Open"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    {event.status}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Mail className="w-4 h-4 mr-2" />
                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {event.contactEmail}
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={event.registrationLink}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center group"
                    >
                      Join Event
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href={`mailto:${event.contactEmail}?subject=Inquiry about ${event.title}`}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <Mail className="w-4 h-4" />
                    </a>

                    <Link
                      to="/donate"
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                      title="Sponsor this event"
                    >
                      <Heart className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sponsorship Section - NEW */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Sponsor Our Events
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Help us make these transformative experiences accessible to more
              youth across Nepal. Your sponsorship creates lasting impact.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  ₹25,000
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Event Sponsor
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  Full event sponsorship with branding opportunities
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  ₹10,000
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Workshop Sponsor
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  Sponsor materials and resources for participants
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  ₹5,000
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Student Sponsor
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  Sponsor participation for underprivileged students
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/donate"
                className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 group"
              >
                <Heart className="w-5 h-5 mr-2" />
                Become a Sponsor
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Custom Sponsorship
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 dark:bg-blue-800 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Join thousands of young leaders who are creating positive change
              across Nepal.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Get In Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
