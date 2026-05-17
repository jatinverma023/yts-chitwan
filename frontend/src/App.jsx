import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

// Simple placeholder page for routes under construction
function ComingSoon({ title }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex items-center justify-center py-32">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-8">This page is coming soon.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// 404 Not Found page
function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex items-center justify-center py-32">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

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

        {/* Placeholder Routes */}
        <Route path="/donate" element={<ComingSoon title="Support Our Mission" />} />
        <Route path="/privacy" element={<ComingSoon title="Privacy Policy" />} />
        <Route path="/terms" element={<ComingSoon title="Terms of Service" />} />

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

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
