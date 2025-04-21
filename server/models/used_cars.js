import mongoose from 'mongoose';

// Define schema for User_Sell collection
const userSellSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleCompany: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String , required: false },  // ✅ Ensure image_url is included
});

// Create model
const UserSell = mongoose.model("User_Sell", userSellSchema);
export default UserSell;
