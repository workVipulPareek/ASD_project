import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Admin } from './models/model.js';
import AuthContext from './Auth/AuthContext.js';  // ✅ Use AuthContext
import SellData from './models/sellData.js';
import ServiceData from './models/ServiceData.js';
import Car from './models/buy.js';  // ✅ Corrected Model Import
import authRoutes from "./Auth/AuthRoutes.js";
import carRoutes from "./routes/cars.js";
import paymentRoutes from "./routes/payment.js";
import Search from "./models/search.js";

const app = express();
const port = 4000;
const SECRET_KEY = 'secretkey';

// ✅ Middleware to parse JSON data
app.use(express.json());

// ✅ Configure CORS Before Routes
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

// ✅ Register Routes
app.use("/api/auth", authRoutes);
app.use("/cars", carRoutes);
app.use("/payments", paymentRoutes);

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/carsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Log Incoming Requests (Debugging)
app.use((req, res, next) => {
  console.log(`📩 Request received: ${req.method} ${req.url}`);
  next();
});

// ✅ User Registration
app.post('/Register', async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, phone, address });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY);

    res.status(201).json({ user: newUser, token, message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ User Login
app.post('/UserLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
    res.status(200).json({ user: existingUser, token, message: 'User login successful' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Buy a Car (Only for Logged-in Users)
app.post('/buy/:id', AuthContext, async (req, res) => {  // ✅ Changed to AuthContext
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.quantity > 0) {
      car.quantity -= 1;
      await car.save();
      res.json({ message: 'Purchase successful' });
    } else {
      res.status(400).json({ message: 'Out of stock' });
    }
  } catch (err) {
    console.error('❌ Error in buy route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get Car List
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error('❌ Error fetching cars:', err);
    res.status(500).send(err);
  }
});

// ✅ Fetch User Profile (Only for Logged-in Users)
app.get('/userProfile', AuthContext, async (req, res) => {  // ✅ Changed to AuthContext
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Edit User Profile (Only for Logged-in Users)
app.post('/EditUserProfile', AuthContext, async (req, res) => {  // ✅ Changed to AuthContext
  try {
    const { name, phone, address } = req.body;
    const email = req.user.email;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, phone, address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

app.get("/search", async (req, res) => {
  try {
      const { 
          name, company, launchYear, minPrice, maxPrice, engineType, engineCapacity,
          bodyStyle, materialUsed, suspensionType, brakes, steeringType,
          fuelTankCapacity, batteryCapacity, parkingAssistance 
      } = req.query;

      let query = {};

      if (name) query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
      if (company) query.company = { $regex: new RegExp(company, "i") }; 
      if (launchYear) query.launchYear = Number(launchYear); 

      if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
      if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

      if (engineType) query.engineType = { $regex: new RegExp(engineType, "i") };
      if (engineCapacity) query.engineCapacity = { $regex: new RegExp(engineCapacity, "i") };
      if (bodyStyle) query.bodyStyle = { $regex: new RegExp(bodyStyle, "i") };
      if (materialUsed) query.materialUsed = { $regex: new RegExp(materialUsed, "i") };
      if (suspensionType) query.suspensionType = { $regex: new RegExp(suspensionType, "i") };
      if (brakes) query.brakes = { $regex: new RegExp(brakes, "i") };
      if (steeringType) query.steeringType = { $regex: new RegExp(steeringType, "i") };
      if (fuelTankCapacity) query.fuelTankCapacity = { $regex: new RegExp(fuelTankCapacity, "i") };
      if (batteryCapacity) query.batteryCapacity = { $regex: new RegExp(batteryCapacity, "i") };
      if (parkingAssistance) query.parkingAssistance = { $regex: new RegExp(parkingAssistance, "i") };

      const searchData = await Search.find(query);
      res.json(searchData);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
