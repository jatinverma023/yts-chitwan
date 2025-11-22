// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function checkRes(res) {
  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(json.message || res.statusText || "API error");
    return json;
  } catch (err) {
    if (!res.ok) throw new Error(text || res.statusText || "API error");
    return {};
  }
}

class ApiService {
  // Public events
  async getEvents() {
    const res = await fetch(`${API_BASE_URL}/events`);
    return checkRes(res);
  }

  // Contact form (public)
  async submitContact(contactData) {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(contactData),
    });
    return checkRes(res);
  }

  // ===== REGISTRATION METHODS (NEW) =====
  
  // Public: Register for an event
  async registerForEvent(eventId, registrationData) {
    const res = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });
    return checkRes(res);
  }

  // Admin: Get all registrations
  async getRegistrations() {
    const res = await fetch(`${API_BASE_URL}/registrations`, {
      headers: authHeaders(),
    });
    return checkRes(res);
  }

  // Admin: Get registrations for a specific event
  async getEventRegistrations(eventId) {
    const res = await fetch(`${API_BASE_URL}/events/${eventId}/registrations`, {
      headers: authHeaders(),
    });
    return checkRes(res);
  }

  // Admin: Delete a registration
  async deleteRegistration(registrationId) {
    const res = await fetch(`${API_BASE_URL}/registrations/${registrationId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return checkRes(res);
  }

  // ===== END REGISTRATION METHODS =====

  // Admin events (list / single / create / update / delete)
  async getAdminEvents() {
    const res = await fetch(`${API_BASE_URL}/events`, {
      headers: authHeaders(),
    });
    return checkRes(res);
  }
  async getAdminEventById(id) {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      headers: authHeaders(),
    });
    return checkRes(res);
  }
  async createEvent(eventData) {
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(eventData),
    });
    return checkRes(res);
  }
  async updateEvent(id, eventData) {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(eventData),
    });
    return checkRes(res);
  }
  async deleteEvent(id) {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return checkRes(res);
  }

  // Admin contacts
  async getAdminContacts() {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      headers: authHeaders(),
    });
    return checkRes(res);
  }
  async markContactAsRead(id) {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ status: "read" }),
    });
    return checkRes(res);
  }

  // Admin users (try /admin/users fallback to /auth/users if necessary)
  async getAdminUsers() {
    let res = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: authHeaders(),
    });
    if (res.status === 404) {
      res = await fetch(`${API_BASE_URL}/auth/users`, { headers: authHeaders() });
    }
    return checkRes(res);
  }

  // Admin stats (optional endpoint)
  async getAdminStats() {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, { headers: authHeaders() });
    if (res.status === 404) {
      // compute minimal stats from other endpoints (best-effort)
      const [users, events, contacts, registrations] = await Promise.allSettled([
        this.getAdminUsers().then(r => (r.users || r)),
        this.getAdminEvents().then(r => (r.events || r)),
        this.getAdminContacts().then(r => (r.contacts || r)),
        this.getRegistrations().then(r => (r.registrations || r)).catch(() => []),
      ]);
      return {
        stats: {
          usersCount: users.status === "fulfilled" ? (users.value.length || users.value.count || 0) : 0,
          eventsCount: events.status === "fulfilled" ? (events.value.length || events.value.count || 0) : 0,
          contactsCount: contacts.status === "fulfilled" ? (contacts.value.length || contacts.value.count || 0) : 0,
          registrationsCount: registrations.status === "fulfilled" ? (registrations.value.length || registrations.value.count || 0) : 0,
        },
      };
    }
    return checkRes(res);
  }
}

export default new ApiService();