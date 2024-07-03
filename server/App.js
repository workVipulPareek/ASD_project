import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Admin } from './models/model.js'; // Adjust path as per your file structure
import AuthContext from './Auth/AuthContext.js'; // Adjust path as per your file structure
import SellData from './models/sellData.js';
import ServiceData from './models/ServiceData.js';
import Car from './models/buy.js';

const app = express();
const port = 4000;
const SECRET_KEY = 'secretkey';

app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Register a user
app.post('/Register', async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword,  phone, address });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY);
    res.status(201).json({ user: newUser, token, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login for a user
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
    console.error('Login error:', err);
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
  const { email, password , roles} = req.body;

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
    res.status(200).json({ user: existingAdmin, token, roles ,  message: 'Admin login successful' });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint (could be expanded as needed)
app.get('/Logout', (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
});

// Sell endpoint
app.post('/sales', async (req, res) => {
  try {
    const { name, email, phone, vehicleNumber, vehicleModel, vehicleCompany, description, status } = req.body;

    const sellData = new SellData({
      name,
      email,
      phone,
      vehicleNumber,
      vehicleModel,
      vehicleCompany,
      description,
      status,
    });

    const savedData = await sellData.save();
    res.status(201).json(savedData);
  } catch (err) {
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
// Delete user endpoint
// Delete user endpoint
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



// Get all sales data
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const cars = [
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

mongoose.connect('mongodb://localhost:27017/carsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    return Car.insertMany(cars);
  })
  .then(() => {
    console.log('Car data inserted');
  })
  

  app.get('/cars', async (req, res) => {
    console.log('GET /cars endpoint hit');
    try {
      const cars = await Car.find();
      console.log('Cars fetched:', cars);
      res.json(cars);
    } catch (err) {
      console.error('Error fetching cars:', err);
      res.status(500).send(err);
    }
  });
  
  
  app.post('/buy/:id', async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (car.quantity > 0) {
        car.quantity -= 1;
        await car.save();
        res.json({ message: 'Purchase successful' });
      } else {
        res.status(400).json({ message: 'Out of stock' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/userProfile', AuthContext, async (req, res) => {
    try {
      console.log('User ID:', req.user); // Debug: Log the user ID extracted from token
  
      // Assuming req.user contains the user's ID
      const user = await User.findOne({ email: req.user.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('User Profile:', user); // Debug: Log the fetched user profile
  
      res.json(user); // Send user profile data as JSON response
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  app.post('/EditUserProfile', AuthContext, async (req, res) => {
    try {
      const { name, phone, address } = req.body;
      const email = req.user.email; // Assuming req.user.email contains the authenticated user's email
  
      const update = { name, phone, address };
      const options = { new: true }; // Return the updated document
  
      // Update the user document
      const user = await User.findOneAndUpdate({ email }, update, options);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Logging for debugging
      console.log('Updated user:', user);
  
      // Send the updated user object as response
      res.json(user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  