import express from "express";
import AuthContext from "../Auth/AuthContext.js";  // ✅ Use AuthContext as middleware
import Search from "../models/search.js";

const router = express.Router();

// ✅ Process Payment (Requires Authentication)
router.post("/process", AuthContext, async (req, res) => {
  try {
    const { carName, price, paymentMethod } = req.body;
    const userId = req.user.id; // ✅ Extracted from token

    if (!carName || !price || !paymentMethod) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    // ✅ Find car by name
    const car = await Search.findOne({ name: carName });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    if (car.quantity <= 0) {
      return res.status(400).json({ error: "Car is out of stock" });
    }

    // ✅ Mock Payment Success Simulation
    const paymentSuccess = Math.random() < 0.9; // 90% success rate

    if (!paymentSuccess) {
      return res.status(400).json({ error: "Payment failed, try again" });
    }

    // ✅ Reduce Car Quantity
    car.quantity -= 1;
    await car.save();

    // ✅ Simulated Order Response
    const orderDetails = {
      userId,
      carName,
      price,
      paymentMethod,
      status: "Success",
      timestamp: new Date(),
    };

    res.status(200).json({ message: "Payment successful", order: orderDetails });
  } catch (error) {
    console.error("❌ Payment processing error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
