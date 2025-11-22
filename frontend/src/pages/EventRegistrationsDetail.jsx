// src/pages/EventRegistrationsDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/api";
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  Trash2,
  Download,
  Loader,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

export default function EventRegistrationsDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchEventAndRegistrations();
  }, [eventId]);

  const fetchEventAndRegistrations = async () => {
    try {
      setLoading(true);

      // Fetch event details
      const eventsResponse = await ApiService.getEvents();
      const events = eventsResponse.events || eventsResponse || [];
      const foundEvent = events.find((e) => (e._id || e.id) === eventId);

      if (foundEvent) {
        setEvent(foundEvent);
      }

      // Fetch registrations for this event
      const regResponse = await ApiService.getEventRegistrations(eventId);
      setRegistrations(regResponse.registrations || []);

      setError("");
    } catch (err) {
      setError("Failed to load event registrations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (registrationId, participantName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${participantName}'s registration?`
      )
    ) {
      return;
    }

    try {
      await ApiService.deleteRegistration(registrationId);
      setSuccess("Registration deleted successfully");
      fetchEventAndRegistrations();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete registration");
      setTimeout(() => setError(""), 3000);
    }
  };

  const exportToCSV = () => {
    if (registrations.length === 0) return;

    const csvContent = [
      ["Name", "Email", "Phone", "Message", "Registered At"],
      ...registrations.map((reg) => [
        reg.name,
        reg.email,
        reg.phone,
        (reg.message || "").replace(/,/g, ";"), // Replace commas to avoid CSV issues
        new Date(reg.registeredAt).toLocaleString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event?.title || "event"}-registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/events")}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </button>

        {/* Event Details Header */}
        {event && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h1>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    {new Date(event.date).toLocaleTimeString()}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    {event.location}
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
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

            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center text-lg">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  {registrations.length} Registration
                  {registrations.length !== 1 ? "s" : ""}
                </span>
              </div>
              {registrations.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export to CSV
                </button>
              )}
            </div>
          </div>
        )}

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

        {/* Registrations List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {registrations.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No registrations yet
              </h3>
              <p className="text-gray-500">
                Registrations will appear here when participants sign up for
                this event
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
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Message
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
                  {registrations.map((registration) => (
                    <tr
                      key={registration._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {registration.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {registration.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {registration.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {registration.message ? (
                          <div className="flex items-start text-sm text-gray-600 max-w-xs">
                            <MessageSquare className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="line-clamp-2">
                              {registration.message}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
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
