import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  LogOut,
  Home,
  Trash2,
} from "lucide-react";
import ApiService from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeEvents: 0,
    pendingContacts: 0,
    growth: "0%",
  });
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const statsData = await ApiService.getDashboardStats();
      setStats(statsData.stats || stats);

      const contactsData = await ApiService.getContacts();
      setContacts(contactsData.contacts || []);

      const eventsData = await ApiService.getEvents();
      setEvents(eventsData.events || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await ApiService.deleteEvent(id);
        fetchDashboardData();
        alert("Event deleted successfully!");
      } catch (error) {
        alert("Failed to delete event");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">YTS Chitwan Management Portal</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Visit Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Contacts</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalContacts}
                </p>
              </div>
              <MessageCircle className="w-12 h-12 text-blue-500" />
            </div>
            <div className="mt-4 text-sm text-green-600">
              +{stats.growth} this month
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Events</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.activeEvents}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-green-500" />
            </div>
            <div className="mt-4 text-sm text-gray-600">Upcoming events</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Contacts</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.pendingContacts}
                </p>
              </div>
              <Users className="w-12 h-12 text-orange-500" />
            </div>
            <div className="mt-4 text-sm text-gray-600">Need review</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Growth Rate</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.growth}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-500" />
            </div>
            <div className="mt-4 text-sm text-green-600">
              Increased engagement
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Contacts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.slice(0, 5).map((contact) => (
                  <tr key={contact.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{contact.name}</td>
                    <td className="py-3 px-4">{contact.email}</td>
                    <td className="py-3 px-4">{contact.subject}</td>
                    <td className="py-3 px-4">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Active Events
          </h2>
          <div className="grid gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      {event.location}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
