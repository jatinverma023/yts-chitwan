// src/pages/AdminContacts.jsx
import { useEffect, useState } from "react";
import ApiService from "../services/api";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await ApiService.getAdminContacts();
        // DEBUG: log the raw response so we can see its shape
        console.log("getAdminContacts response:", res);

        // Accept any of these shapes:
        // 1) array -> [ {...}, ... ]
        // 2) { contacts: [...] }
        // 3) { data: [...] } (defensive)
        // 4) fallback -> []
        let list = [];
        if (Array.isArray(res)) {
          list = res;
        } else if (res && Array.isArray(res.contacts)) {
          list = res.contacts;
        } else if (res && Array.isArray(res.data)) {
          list = res.data;
        } else {
          // if the backend returned `{ message: '...' }`, capture that
          console.warn("Unexpected contacts response shape:", res);
          list = [];
        }

        setContacts(list);
      } catch (err) {
        console.error("Failed to load contacts:", err);
        setError(err.message || "Failed to load contacts");
        setContacts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const markRead = async (id) => {
    try {
      await ApiService.markContactAsRead(id);
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: "read" } : c))
      );
    } catch (err) {
      alert(err.message || "Failed to update contact");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>

      {loading && <div>Loading...</div>}

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
          {error}. Check console/network for details.
        </div>
      )}

      {!loading && contacts.length === 0 && !error && (
        <div className="bg-white p-4 rounded shadow">No messages</div>
      )}

      <div className="space-y-3">
        {contacts.map((c) => (
          <div
            key={c._id || c.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <div className="font-semibold">
                {c.name}{" "}
                <span className="text-sm text-gray-500">({c.email})</span>
              </div>
              <div className="text-sm text-gray-500">
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
              </div>
              <div className="mt-2 text-gray-700 whitespace-pre-wrap">
                {c.message}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => markRead(c._id || c.id)}
                className={`px-3 py-1 rounded ${c.status === "read" ? "bg-green-200" : "bg-blue-600 text-white"}`}
              >
                {c.status === "read" ? "Read" : "Mark read"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
