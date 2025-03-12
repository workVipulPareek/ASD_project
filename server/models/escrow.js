const mongoose = require('mongoose');

const EscrowSchema = new mongoose.Schema({
  transactionId: String,
  buyerId: mongoose.Schema.Types.ObjectId,
  sellerId: mongoose.Schema.Types.ObjectId,
  carId: mongoose.Schema.Types.ObjectId,
  amount: Number, // Always 0 in simulation
  status: { type: String, enum: ["Pending", "Released", "Disputed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Escrow", EscrowSchema);
