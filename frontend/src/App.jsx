import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import EventRegistration from "./pages/EventRegistration.jsx";

// Admin pages
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminContacts from "./pages/AdminContacts.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminEvents from "./pages/AdminEvents.jsx";
import AdminEventForm from "./pages/admin/AdminEventForm.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import AdminProtection from "./components/AdminProtection.jsx";
import AdminRegistrations from "./pages/AdminRegistrations.jsx";
import EventRegistrationsDetail from "./pages/EventRegistrationsDetail.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <Home />
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <About />
              <Footer />
            </div>
          }
        />
        <Route
          path="/events"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <Events />
              <Footer />
            </div>
          }
        />
        <Route
          path="/events/register/:id"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <EventRegistration />
              <Footer />
            </div>
          }
        />
        <Route
          path="/team"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <Team />
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <Contact />
              <Footer />
            </div>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtection>
              <AdminLayout />
            </AdminProtection>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<AdminEventForm />} />
          <Route path="events/edit/:id" element={<AdminEventForm />} />
          <Route
            path="events/:eventId/registrations"
            element={<EventRegistrationsDetail />}
          />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
