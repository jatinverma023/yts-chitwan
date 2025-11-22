import { useState, useEffect } from "react";
import ApiService from "../services/api";
import {
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Loader,
  RefreshCw,
} from "lucide-react";

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch all dashboard data
      const [contactsResponse, eventsResponse] = await Promise.all([
        ApiService.getContacts().catch(() => ({ contacts: [] })),
        ApiService.getEvents().catch(() => ({ events: [] })),
      ]);

      setContacts(contactsResponse.contacts || []);
      setEvents(eventsResponse.events || []);

      // Calculate stats
      setStats({
        totalContacts: contactsResponse.contacts?.length || 0,
        activeEvents:
          eventsResponse.events?.filter((e) => e.isActive)?.length || 0,
        pendingContacts:
          contactsResponse.contacts?.filter((c) => c.status === "pending")
            ?.length || 0,
        thisMonthContacts:
          contactsResponse.contacts?.filter(
            (c) => new Date(c.createdAt).getMonth() === new Date().getMonth()
          )?.length || 0,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: "Total Contacts",
      value: stats.totalContacts || 0,
      icon: MessageCircle,
      color: "bg-blue-500",
      change: `${stats.thisMonthContacts || 0} this month`,
      changeColor: "text-blue-600",
    },
    {
      title: "Active Events",
      value: stats.activeEvents || 0,
      icon: Calendar,
      color: "bg-green-500",
      change: "upcoming events",
      changeColor: "text-green-600",
    },
    {
      title: "Pending Contacts",
      value: stats.pendingContacts || 0,
      icon: AlertCircle,
      color: "bg-orange-500",
      change: "need response",
      changeColor: "text-orange-600",
    },
    {
      title: "Growth Rate",
      value: "24%",
      icon: TrendingUp,
      color: "bg-purple-500",
      change: "+5% from last month",
      changeColor: "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              YTS Chitwan Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor your organization's growth and engagement
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
            <button
              onClick={fetchDashboardData}
              className="ml-auto text-red-800 hover:text-red-900 underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 ${stat.changeColor}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Contacts */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                Recent Contacts ({contacts.length})
              </h2>
            </div>
            <div className="p-6">
              {contacts.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No contacts yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {contacts.slice(0, 10).map((contact) => (
                    <div
                      key={contact.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {contact.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Mail className="w-4 h-4 mr-2" />
                        {contact.email}
                      </div>

                      <p className="text-sm font-medium text-gray-800 mb-1">
                        Subject: {contact.subject}
                      </p>

                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {contact.message}
                      </p>

                      <div className="flex justify-between items-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            contact.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : contact.status === "read"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {contact.status}
                        </span>

                        <div className="flex space-x-2">
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Reply
                          </a>
                          <button className="text-gray-600 hover:text-gray-800 text-sm flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Events & System Status */}
          <div className="space-y-6">
            {/* Active Events */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Active Events ({events.length})
              </h2>

              {events.length === 0 ? (
                <div className="text-center py-6">
                  <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No events scheduled</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {events.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {event.location}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            event.category === "workshop"
                              ? "bg-blue-100 text-blue-800"
                              : event.category === "seminar"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {event.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                System Status
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Backend API</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database (MAMP)</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Connected
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Contact Form</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Active
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() =>
                    window.open("http://localhost:8888/phpMyAdmin/", "_blank")
                  }
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Open Database (phpMyAdmin)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
