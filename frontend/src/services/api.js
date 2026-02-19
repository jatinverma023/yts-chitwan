// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Safety check (helps in debugging production)
if (!API_BASE_URL) {
  console.error("❌ VITE_API_URL is not defined in environment variables");
}

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function checkRes(res) {
  const text = await res.text();

  try {
    const json = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(json.message || res.statusText || "API error");
    }

    return json;
  } catch (err) {
    if (!res.ok) {
      throw new Error(text || res.statusText || "API error");
    }

    return {};
  }
}

class ApiService {
  // ======================
  // PUBLIC METHODS
  // ======================

  async getEvents() {
    const res = await fetch(`${API_BASE_URL}/events`);
    return checkRes(res);
  }

  async submitContact(contactData) {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify(contactData),
    });

    return checkRes(res);
  }

  async registerForEvent(eventId, registrationData) {
  const res = await fetch(
    `${API_BASE_URL}/events/${eventId}/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    }
  );

  return checkRes(res);
}


  // ======================
  // ADMIN METHODS
  // ======================

  async getRegistrations() {
    const res = await fetch(`${API_BASE_URL}/registrations/registrations`, {
      headers: authHeaders(),
    });

    return checkRes(res);
  }

  async getEventRegistrations(eventId) {
    const res = await fetch(
      `${API_BASE_URL}/registrations/events/${eventId}/registrations`,
      {
        headers: authHeaders(),
      }
    );

    return checkRes(res);
  }

  async deleteRegistration(registrationId) {
    const res = await fetch(
      `${API_BASE_URL}/registrations/registrations/${registrationId}`,
      {
        method: "DELETE",
        headers: authHeaders(),
      }
    );

    return checkRes(res);
  }

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
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify(eventData),
    });

    return checkRes(res);
  }

  async updateEvent(id, eventData) {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
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

  async getAdminContacts() {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      headers: authHeaders(),
    });

    return checkRes(res);
  }

  async markContactAsRead(id) {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({ status: "read" }),
    });

    return checkRes(res);
  }

  async getAdminUsers() {
    let res = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: authHeaders(),
    });

    if (res.status === 404) {
      res = await fetch(`${API_BASE_URL}/auth/users`, {
        headers: authHeaders(),
      });
    }

    return checkRes(res);
  }

  async getAdminStats() {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: authHeaders(),
    });

    return checkRes(res);
  }
  
}

export default new ApiService();
