const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// POST /api/_debug/db/disconnect -> disconnect mongoose (simulate DB down)
router.post("/disconnect", async (req, res) => {
  try {
    await mongoose.disconnect();
    return res.send({ ok: true, msg: "mongoose disconnected" });
  } catch (err) {
    return res.status(500).send({ ok: false, error: err.message });
  }
});

// POST /api/_debug/db/reconnect -> reconnect to configured URI
router.post("/reconnect", async (req, res) => {
  const uri = process.env.MONGO_URI || "mongodb://localhost/vidly";
  try {
    await mongoose.connect(uri);
    return res.send({ ok: true, msg: "mongoose reconnected" });
  } catch (err) {
    return res.status(500).send({ ok: false, error: err.message });
  }
});

module.exports = router;
