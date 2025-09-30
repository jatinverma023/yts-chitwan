import { useState, useEffect } from "react";
import ApiService from "../services/api";
import Reveal from "../components/Reveal";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  Loader,
} from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await ApiService.getEvents();
      setEvents(response.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Clean, no admin buttons */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Join Our Community</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover workshops, seminars, and activities that will transform
              your future
            </p>
          </Reveal>
        </div>
      </section>

      {/* Events Display - NO SUPPORT SECTION HERE ✅ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Events ({events.length})
              </h2>
              <p className="text-xl text-gray-600">
                Join us for exciting workshops and community activities
              </p>
            </div>
          </Reveal>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8 text-center">
              {error}
            </div>
          )}

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                No events scheduled at the moment
              </p>
              <p className="text-gray-400">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Reveal key={event.id} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-white opacity-50" />
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            event.category === "workshop"
                              ? "bg-blue-100 text-blue-800"
                              : event.category === "seminar"
                              ? "bg-green-100 text-green-800"
                              : event.category === "competition"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {event.category}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Clock className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleString()}
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group">
                        <Users className="w-5 h-5 mr-2" />
                        Register Now
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* NO "Support Our Mission" section anywhere ✅ */}
    </div>
  );
}
