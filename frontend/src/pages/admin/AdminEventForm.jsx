// src/pages/admin/AdminEventForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../services/api";

export default function AdminEventForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = (await ApiService.getAdminEventById)
          ? await ApiService.getAdminEventById(id)
          : await ApiService.getAdminEvents();
        if (res.event) {
          const e = res.event;
          setForm({
            title: e.title || "",
            description: e.description || "",
            date: e.date ? e.date.slice(0, 16) : "",
            location: e.location || "",
            category: e.category || "",
          });
        } else {
          // fallback: find in events array
          const evs = res.events || res;
          const e = evs.find((x) => x._id === id);
          if (!e) throw new Error("Event not found");
          setForm({
            title: e.title || "",
            description: e.description || "",
            date: e.date ? e.date.slice(0, 16) : "",
            location: e.location || "",
            category: e.category || "",
          });
        }
      } catch (error) {
        setErr(error.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const change = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      setLoading(true);
      const payload = {
        ...form,
        date: form.date ? new Date(form.date).toISOString() : undefined,
      };
      if (id) {
        await ApiService.updateEvent(id, payload);
      } else {
        await ApiService.createEvent(payload);
      }
      navigate("/admin/events");
    } catch (error) {
      setErr(error.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit Event" : "New Event"}
      </h2>
      {err && <div className="mb-4 text-red-600">{err}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={change}
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={change}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="location"
          value={form.location}
          onChange={change}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={change}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={change}
          rows={5}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/events")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
