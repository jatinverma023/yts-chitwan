import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/api";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const ev = await ApiService.getAdminEvents();
        setEvents(ev.events || ev);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      await ApiService.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <button
          onClick={() => navigate("/admin/events/new")}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          + Add Event
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {events.length === 0 ? (
            <div className="bg-white p-4 rounded shadow">No events</div>
          ) : (
            events.map((ev) => (
              <div
                key={ev._id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{ev.title}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(ev.date).toLocaleString()} — {ev.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/events/edit/${ev._id}`)}
                    className="px-3 py-1 border rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ev._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
