import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Search from "../models/search.js";

// ✅ Get car by ID (Fixes 404 issue)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid car ID format" });
    }

    const car = await Search.findById(new mongoose.Types.ObjectId(id));

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router; // ✅ Ensure default export
