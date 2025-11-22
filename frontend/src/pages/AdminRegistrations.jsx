// src/pages/AdminRegistrations.jsx
import { useState, useEffect } from "react";
import ApiService from "../services/api";
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Loader,
  CheckCircle,
  AlertCircle,
  Download,
  Filter,
} from "lucide-react";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [regsResponse, eventsResponse] = await Promise.all([
        ApiService.getRegistrations(),
        ApiService.getEvents(),
      ]);

      setRegistrations(regsResponse.registrations || []);
      setEvents(eventsResponse.events || eventsResponse || []);
      setError("");
    } catch (err) {
      setError("Failed to load registrations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (registrationId, userName) => {
    if (window.confirm(`Delete registration from ${userName}?`)) {
      try {
        await ApiService.deleteRegistration(registrationId);
        setSuccess("Registration deleted successfully");
        fetchData();

        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete registration");
      }
    }
  };

  const exportToCSV = () => {
    const filteredRegs =
      selectedEvent === "all"
        ? registrations
        : registrations.filter(
            (r) => (r.eventId?._id || r.eventId) === selectedEvent
          );

    const csvContent = [
      ["Name", "Email", "Phone", "Event", "Registered At", "Message"],
      ...filteredRegs.map((reg) => [
        reg.name,
        reg.email,
        reg.phone,
        reg.eventId?.title || "Unknown Event",
        new Date(reg.registeredAt).toLocaleString(),
        reg.message || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filteredRegistrations =
    selectedEvent === "all"
      ? registrations
      : registrations.filter(
          (reg) => (reg.eventId?._id || reg.eventId) === selectedEvent
        );

  const getEventStats = () => {
    const stats = {};
    registrations.forEach((reg) => {
      const eventTitle = reg.eventId?.title || "Unknown";
      stats[eventTitle] = (stats[eventTitle] || 0) + 1;
    });
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading registrations...</p>
        </div>
      </div>
    );
  }

  const eventStats = getEventStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Event Registrations
          </h1>
          <p className="text-gray-600">
            Manage all event registrations ({filteredRegistrations.length}{" "}
            total)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Total Registrations
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {registrations.length}
                </p>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Events</p>
                <p className="text-3xl font-bold text-gray-900">
                  {events.length}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg per Event</p>
                <p className="text-3xl font-bold text-gray-900">
                  {events.length > 0
                    ? Math.round(registrations.length / events.length)
                    : 0}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {success}
            <button onClick={() => setSuccess("")} className="ml-auto text-2xl">
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
            <button onClick={() => setError("")} className="ml-auto text-2xl">
              ×
            </button>
          </div>
        )}

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Events</option>
                {events.map((event) => {
                  const eventId = event._id || event.id;
                  return (
                    <option key={eventId} value={eventId}>
                      {event.title} ({eventStats[event.title] || 0})
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              onClick={exportToCSV}
              disabled={filteredRegistrations.length === 0}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5 mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No registrations yet
              </h3>
              <p className="text-gray-500">
                Registrations will appear here when users sign up for events
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Participant
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Registered
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRegistrations.map((registration) => (
                    <tr key={registration._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {registration.name}
                            </p>
                            {registration.message && (
                              <p className="text-sm text-gray-500 line-clamp-1">
                                {registration.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            {registration.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            {registration.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            {registration.eventId?.title || "Unknown Event"}
                          </p>
                          <p className="text-gray-500">
                            {registration.eventId?.category || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          <p>
                            {new Date(
                              registration.registeredAt
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-gray-500">
                            {new Date(
                              registration.registeredAt
                            ).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            handleDelete(registration._id, registration.name)
                          }
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete registration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
