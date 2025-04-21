import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Admin } from './models/model.js';
import AuthContext from './Auth/AuthContext.js';
import SellData from './models/sellData.js';
import ServiceData from './models/ServiceData.js';
//import Car from './models/buy.js';
import Search from './models/search.js';
import authRoutes from "./Auth/AuthRoutes.js";
import carRoutes from "./routes/cars.js";
import paymentRoutes from "./routes/payment.js";
import UserSell from './models/used_cars.js';
import Purchase from "./models/Purchase.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:3000", // Adjust as per frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));
app.use(express.json());


// ✅ Log Incoming Requests (Debugging)
app.use((req, res, next) => {
  console.log(`📩 Request received: ${req.method} ${req.url}`);
  next();
});

// ✅ Register Routes
app.use("/api/auth", authRoutes);
app.use("/cars", carRoutes);
app.use("/payments", paymentRoutes);

// ✅ MongoDB Connection
// Remove deprecated options
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vijay')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

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

// Register an admin
app.post('/AdminRegister', async (req, res) => {
  const { email, password, roles } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ email, password: hashedPassword, roles });
    const token = jwt.sign({ email: newAdmin.email, id: newAdmin._id, roles: newAdmin.roles }, SECRET_KEY);
    
    res.status(201).json({ user: newAdmin, token, message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Admin registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login for an admin
app.post('/AdminLogin', async (req, res) => {
  const { email, password, roles } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ error: 'Admin user does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: existingAdmin.email, id: existingAdmin._id, roles: existingAdmin.roles }, SECRET_KEY);
    res.status(200).json({ user: existingAdmin, token, roles, message: 'Admin login successful' });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.get('/Logout', (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
});


app.post('/sales', async (req, res) => {
  try {
    console.log("Received Data:", req.body);  // Debugging step

    const { name, email, phone, vehicleNumber, vehicleModel, vehicleCompany, description, status, image_url } = req.body;

    const sellData = new SellData({
      name,
      email,
      phone,
      vehicleNumber,
      vehicleModel,
      vehicleCompany,
      status,
      description,
      image_url ,
    });

    const savedData = await sellData.save();
    res.status(201).json(savedData);
  } catch (err) {
    console.error("Error saving data:", err); // Debugging step
    res.status(400).json({ error: err.message });
  }
});

// Service endpoint
app.post('/services', async (req, res) => {
  try {
    const { name, email, phone, serviceType, vehicleCompany, vehicleModel, vehicleNumber, date, description, status } = req.body;

    const newServiceData = new ServiceData({
      name,
      email,
      phone,
      serviceType,
      vehicleCompany,
      vehicleModel,
      vehicleNumber,
      date,
      description,
      status,
    });

    const savedServiceData = await newServiceData.save();
    res.status(201).json({ data: savedServiceData, message: 'Service data added successfully' });
  } catch (err) {
    console.error('Service data error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update the status of a service request - Remove duplicate
app.put('/updateServiceRequestStatus/:id', AuthContext, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedRequest = await ServiceData.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: 'Error updating request status' });
  }
});

// Fetch all service requests for admin
app.get('/services', AuthContext, async (req, res) => {
  try {
    const requests = await ServiceData.find({});
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching service requests' });
  }
});

// Delete service request
app.delete('/services/:id', AuthContext, async (req, res) => {
  try {
    await ServiceData.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting request' });
  }
});


// Endpoint to fetch the Resell request
app.get('/userSellRequests', AuthContext, async (req, res) => {
  try {
    const userRequests = await SellData.find({ email: req.user.email });
    res.json(userRequests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user service requests' });
  }
});

// Delete user endpoint
app.delete('/users/:email', async (req, res) => {
  const { email } = req.params;
  console.log(`Deleting user with email: ${email}`);

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Get all sales data
app.get('/sales', async (req, res) => {
  try {
    const salesData = await SellData.find();
    res.status(200).json(salesData);
  } catch (err) {
    console.error('Error fetching sales data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all service data
app.get('/services', async (req, res) => {
  try {
    const services = await ServiceData.find();
    res.status(200).json(services);
  } catch (err) {
    console.error('Error fetching service data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (only emails for now)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'email');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/*const cars = [
  { image: "rollsroyce", name: "Rolls-Royce Phantom:", description: "Epitome of luxury and refinement with bespoke craftsmanship.", quantity: 5 },
  { image: "bentley", name: "Bentley Continental GT:", description: "Powerful grand tourer blending opulence with dynamic performance.", quantity: 3 },
  { image: "mercedes", name: "Mercedes-Maybach S-Class:", description: "Ultimate in chauffeur-driven luxury and cutting-edge technology.", quantity: 4 },
  { image: "bmw", name: "BMW 7 Series:", description: "Executive sedan known for its comfort, innovation, and driving dynamics.", quantity: 6 },
  { image: "audi", name: "Audi A8 L:", description: "Flagship sedan offering exceptional comfort, style, and advanced driver assistance systems.", quantity: 2 },
  { image: "defender", name: "Defender", description: "The Defender is a rugged, off-road capable SUV produced by Land Rover.", quantity: 7 },
  { image: "lexus", name: "Lexus LS 500h:", description: "Japanese luxury hybrid sedan renowned for its comfort and reliability.", quantity: 3 },
  { image: "volvo", name: "Volvo XC90 Excellence:", description: "Premium SUV offering Scandinavian luxury and advanced safety features.", quantity: 4 },
  { image: "maserati", name: "Maserati Quattroporte:", description: "Italian luxury sedan with a blend of sportiness and refined elegance.", quantity: 5 },
];
*/
/*mongoose.connect('mongodb://localhost:27017/vijay', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    return Car.insertMany(cars);
  })
  .then(() => {
    console.log('Car data inserted');
  })
*/


  app.get('/admin_cars', async (req, res) => {
    try {
        const cars = await Search.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error });
    }
});

// ✅ Update car details
app.put('/update_car/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedCar = await Search.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
        res.json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Error updating car details', error });
    }
});

// ✅ Add a new car
app.post('/add_car', async (req, res) => {
    try {
        const newCar = new Search(req.body);
        await newCar.save();
        res.json({ message: 'Car added successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ message: 'Error adding car', error });
    }
});
  
  app.get('/buy_cars', async (req, res) => {
    console.log('GET /cars endpoint hit');
    try {
      const cars = await Search.find();
      console.log('Cars fetched:', cars);
      res.json(cars);
    } catch (err) {
      console.error('Error fetching cars:', err);
      res.status(500).send(err);
    }
  });
  
  
  app.put('/buy/:id', async (req, res) => {
    try {
      console.log("Received Buy Request for ID:", req.params.id); // ✅ Debugging log
  
      const car = await Search.findById(req.params.id);
      if (!car) return res.status(404).json({ error: "Car not found" });
  
      if (car.quantity > 0) {
        await car.save();
        return res.json({ message: 'Purchase successful' });
      } else {
        return res.status(400).json({ error: 'Out of stock' });
      }
    } catch (err) {
      console.error("Error processing buy:", err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Delete service request endpoint
app.delete('/services/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting service request with id: ${id}`);

  try {
    const deletedRequest = await ServiceData.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    res.status(200).json({ message: 'Service request deleted successfully' });
  } catch (error) {
    console.error('Error deleting service request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Fetch User Profile (Only for Logged-in Users)
app.get('/userProfile', AuthContext, async (req, res) => {
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
app.post('/EditUserProfile', AuthContext, async (req, res) => {
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

// ✅ Search endpoint
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

app.post('/payments/process', AuthContext, async (req, res) => {
  try {
    const { carId, carName, price, paymentMethod } = req.body;
    const email = req.user.email;

    const newPurchase = new Purchase({
      userEmail: email,
      carId,
      carName,  // ✅ Ensure carName is saved
      price,
      paymentMethod,
      transactionId: crypto.randomUUID()  // ✅ Add transaction ID
    });

    await newPurchase.save();
    res.status(200).json({ message: "Payment successful", transactionId: newPurchase.transactionId });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
});


// ✅ Fetch User's Service Requests
app.get('/userServiceRequests', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const requests = await ServiceData.find({ email });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching user service requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Fetch User's Resell Requests
app.get('/userSellRequests', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const resellRequests = await SellData.find({ email });
    res.json(resellRequests);
  } catch (error) {
    console.error("Error fetching user resell requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/userPurchases', AuthContext, async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const purchases = await Purchase.find({ userEmail: email });

    if (!purchases || purchases.length === 0) {
      return res.status(404).json({ message: "No purchases found" });
    }

    res.json(purchases);
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





// ✅ Start Server - JUST ONCE AT THE END OF THE FILE
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

app.put('/updateSaleStatus/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedSale = await SellData.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSale) {
      return res.status(404).json({ error: 'Sale request not found' });
    }

    res.json(updatedSale);
  } catch (error) {
    console.error('Error updating sale status:', error);
    res.status(500).json({ error: 'Error updating sale status' });
  }
});

// Delete Sale
app.delete('/deleteSale/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await SellData.findByIdAndDelete(id);

    if (!deletedSale) {
      return res.status(404).json({ error: 'Sale request not found' });
    }

    res.json({ message: 'Sale deleted successfully' });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ error: 'Error deleting sale request' });
  }
});

app.get('/sales', async (req, res) => {
  try {
    const sales = await SellData.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sales data' });
  }
});


// ✅ Update sale status
app.post('/usedcarsell', async (req, res) => {
  try {
      const newSale = new UserSell(req.body);
      await newSale.save();
      res.status(201).json(newSale);
  } catch (error) {
      res.status(500).json({ message: "Error adding sale", error });
  }
});


app.put('/updateSaleStatus/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;

      // 🔹 Update status in SellData
      const updatedSale = await SellData.findByIdAndUpdate(id, { status }, { new: true });

      if (!updatedSale) {
          return res.status(404).json({ message: "Sale not found" });
      }

      res.status(200).json({ message: "Sale status updated successfully!", updatedSale });

  } catch (error) {
      console.error("❌ Error updating sale status:", error.message);
      res.status(500).json({ message: "Error updating sale status", error: error.message });
  }
});

app.get("/user-sell", async (req, res) => {
  try {
    const cars = await UserSell.find({ status: "Added" }); // Only fetch "added" cars
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cars" });
  }
});

// Handle purchase
app.put("/buy_old/:id", async (req, res) => {
  try {
    const car = await UserSell.findByIdAndUpdate(
      req.params.id,
      { status: "sold" },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json({ message: "Car purchased successfully", car });
  } catch (error) {
    console.error("Error updating car status:", error);
    res.status(500).json({ error: "Failed to update car status" });
  }
});


// Check authentication (Mock API)
app.get("/api/auth/check-auth", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === "valid_token") {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});



// ✅ Get user profile


// ✅ Get user's service requests
