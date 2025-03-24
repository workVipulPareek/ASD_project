import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  carName: { type: String, required: true },
  price: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "Completed" }
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;
