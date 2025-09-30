// Use environment variable for API URL (works for local AND production)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class ApiService {
  // ========== EVENTS ==========
  
  async getEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }

  async createEvent(eventData) {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to create event:', error);
      throw new Error(`Failed to create event: ${error.message}`);
    }
  }

  async updateEvent(id, eventData) {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to update event:', error);
      throw new Error(`Failed to update event: ${error.message}`);
    }
  }

  async deleteEvent(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw new Error(`Failed to delete event: ${error.message}`);
    }
  }

  // ========== CONTACTS ==========

  async getContacts() {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      // Return empty array if API fails (instead of dummy data)
      return {
        contacts: [],
        count: 0,
        message: 'Failed to fetch contacts'
      };
    }
  }

  async submitContact(contactData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to submit contact:', error);
      throw new Error(`Failed to submit contact: ${error.message}`);
    }
  }

  async updateContactStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to update contact status:', error);
      throw error;
    }
  }

  async deleteContact(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to delete contact:', error);
      throw error;
    }
  }

  // ========== DASHBOARD STATS ==========

  async getDashboardStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      return {
        stats: {
          totalContacts: 0,
          activeEvents: 0,
          pendingContacts: 0,
          growth: '0%'
        }
      };
    }
  }
}

export default new ApiService();
