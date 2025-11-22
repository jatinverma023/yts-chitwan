import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/api";
import Reveal from "./Reveal";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  Save,
  X,
  Loader,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";

export default function EventsManager() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registrationCounts, setRegistrationCounts] = useState({});

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "workshop",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getEvents();
      const eventsList = response.events || [];
      setEvents(eventsList);

      // Fetch registration counts for each event
      for (const event of eventsList) {
        const eventId = event._id || event.id;
        try {
          const regResponse = await ApiService.getEventRegistrations(eventId);
          setRegistrationCounts((prev) => ({
            ...prev,
            [eventId]:
              regResponse.count || regResponse.registrations?.length || 0,
          }));
        } catch (err) {
          console.error(
            `Failed to fetch registrations for event ${eventId}:`,
            err
          );
        }
      }

      setError("");
    } catch (error) {
      setError("Failed to load events");
      console.error("Fetch events error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      category: "workshop",
    });
    setEditingEvent(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingEvent) {
        await ApiService.updateEvent(editingEvent.id, formData);
        setSuccess("Event updated successfully!");
      } else {
        await ApiService.createEvent(formData);
        setSuccess("Event created successfully!");
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
      location: event.location,
      category: event.category,
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (eventId, eventTitle) => {
    if (window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      try {
        setLoading(true);
        await ApiService.deleteEvent(eventId);
        setSuccess("Event deleted successfully!");
        fetchEvents();
      } catch (error) {
        setError("Failed to delete event");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewRegistrations = (eventId) => {
    navigate(`/admin/events/${eventId}/registrations`);
  };

  if (loading && events.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Events Management
            </h1>
            <p className="text-gray-600">
              Manage all YTS Chitwan events ({events.length} total)
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Event
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {success}
            <button
              onClick={() => setSuccess("")}
              className="ml-auto text-green-800"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingEvent ? "Edit Event" : "Add New Event"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                      <option value="competition">Competition</option>
                      <option value="social">Social Event</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter event location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe the event..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        {editingEvent ? "Update Event" : "Create Event"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No events yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first event to get started
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add First Event
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase">
                      Registrations
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((event, index) => {
                    const eventId = event._id || event.id;
                    const regCount = registrationCounts[eventId] || 0;

                    return (
                      <Reveal key={eventId} delay={index * 0.05}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {event.title}
                              </div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {event.description}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4 mr-2" />
                              {new Date(event.date).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleViewRegistrations(eventId)}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <Users className="w-4 h-4 mr-1" />
                              <span className="font-semibold">{regCount}</span>
                            </button>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => handleEdit(event)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Edit event"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(eventId, event.title)
                                }
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </Reveal>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
