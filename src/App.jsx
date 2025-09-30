import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

// Admin pages (NEW structure - pages/admin/)
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";

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

        {/* Admin Routes - Simple structure */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
