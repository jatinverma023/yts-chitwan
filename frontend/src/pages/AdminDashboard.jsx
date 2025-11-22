// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/api";
import {
  Users,
  Calendar,
  Mail,
  UserCheck,
  TrendingUp,
  Loader,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    usersCount: 0,
    eventsCount: 0,
    contactsCount: 0,
    registrationsCount: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsResponse = await ApiService.getAdminStats();
      setStats(statsResponse.stats || statsResponse);

      // Fetch recent events
      const eventsResponse = await ApiService.getAdminEvents();
      const events = eventsResponse.events || eventsResponse || [];

      // Get the 5 most recent events
      const sortedEvents = events
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setRecentEvents(sortedEvents);

      setError("");
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with YTS Chitwan.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
            <button onClick={() => setError("")} className="ml-auto text-2xl">
              ×
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users Card */}
          <div
            onClick={() => navigate("/admin/users")}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.usersCount}
                </p>
                <p className="text-xs text-blue-600 mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Total registered
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Events Card */}
          <div
            onClick={() => navigate("/admin/events")}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Events</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.eventsCount}
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Active events
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Registrations Card */}
          <div
            onClick={() => navigate("/admin/registrations")}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Registrations</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.registrationsCount}
                </p>
                <p className="text-xs text-purple-600 mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Event sign-ups
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Contacts Card */}
          <div
            onClick={() => navigate("/admin/contacts")}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Contacts</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.contactsCount}
                </p>
                <p className="text-xs text-orange-600 mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Messages received
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Latest Events Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Latest Events</h2>
              <button
                onClick={() => navigate("/admin/events")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All →
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {recentEvents.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p>No events yet</p>
                <button
                  onClick={() => navigate("/admin/events/new")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create First Event
                </button>
              </div>
            ) : (
              recentEvents.map((event) => (
                <div
                  key={event._id || event.id}
                  onClick={() => navigate("/admin/events")}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <span
                      className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
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
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate("/admin/events/new")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Calendar className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Create Event</h3>
            <p className="text-sm text-blue-100">Add a new event</p>
          </button>

          <button
            onClick={() => navigate("/admin/registrations")}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <UserCheck className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-semibold mb-1">View Registrations</h3>
            <p className="text-sm text-green-100">Manage event sign-ups</p>
          </button>

          <button
            onClick={() => navigate("/admin/contacts")}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Mail className="w-8 h-8 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Check Messages</h3>
            <p className="text-sm text-orange-100">Review contact forms</p>
          </button>
        </div>
      </div>
    </div>
  );
}
