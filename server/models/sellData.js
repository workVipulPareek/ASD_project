import mongoose from 'mongoose';

// Define a schema for the SellData collection
const sellDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleCompany: { type: String, required: true },
  status : { type: String, required: true },
  description: { type: String, required: true },
});

// Create a model for the SellData collection
const SellData = mongoose.model("selldata", sellDataSchema);
export default SellData;
