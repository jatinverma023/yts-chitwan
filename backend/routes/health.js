import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;

  const status = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  return res.json({
    success: true,
    server: "OK",
    database: status[dbState],
    timestamp: new Date(),
  });
});

export default router;
