import mongoose from 'mongoose';

// Define Mongoose schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: Number,
  address: String,
  secret: String,
  profilePicture: String ,
  secret : String
});
// Ensure index on email field
userSchema.index({ email: 1 }, { unique: true });
// Define Mongoose models
export const User = mongoose.model('User', userSchema);



const adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: Number,
    address: String,
    secret: String
    });

adminSchema.index({ email: 1 }, { unique: true });
export const Admin = mongoose.model('Admin', adminSchema);

const selldataSchema = new mongoose.Schema({
  // Define your schema for selldata here
  // Example:
  item: String,
  price: Number,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Example reference to User model
});

export const Selldata = mongoose.model('Selldata', selldataSchema);
