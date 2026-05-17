// Consolidated admin middleware - uses auth + requireAdmin from auth.js
const { auth, requireAdmin } = require('./auth');

// Combined middleware: authenticate + check admin in one step
// Usage: router.get('/route', isAdmin, handler)
module.exports = async (req, res, next) => {
  // Run auth first
  auth(req, res, (err) => {
    if (err) return; // auth already sent the response
    if (!req.user) return; // auth already sent 401
    // Then check admin
    requireAdmin(req, res, next);
  });
};
