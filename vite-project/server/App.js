import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Admin,Selldata } from '../models/model.js'; // Import your models from models.js
import AuthContext from '../Auth/AuthContext.js'; // Adjust the path as needed
import postData from './sellData.js'; // Adjust the path as needed
import postServiceData from './ServiceData.js';


const app = express();
const port = 5000;
const SECRET_KEY = 'secretkey';

app.use(cors()); // Enable CORS
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

//User Register endpoint
app.post('/Register', async function(req, res){
  const { email, password } = req.body;

  console.log("Register request received:", { email, password });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ 
      email: email,
      password: hashedPassword  // Store hashed password in the 'password' field
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token, message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login endpoint
app.post('/UserLogin', async function(req, res){
  const { email, password } = req.body;
  console.log("Login request received:", { email, password });
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password , existingUser.password);

    if (!passwordMatch ) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
    res.status(200).json({ user: existingUser, token: token, message: 'User login successful' });
    console.log(token);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Register endpoint
app.post('/AdminRegister', async function(req, res){
  const { email, password } = req.body;

  console.log("Register request received:", { email, password });

  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Admin User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await Admin.create({ 
      email: email,
      password: hashedPassword  // Store hashed password in the 'password' field
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token, message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//admin login endpoint
app.post('/AdminLogin', async function(req, res){
  const { email, password } = req.body;
  console.log("Login request received:", { email, password });
  try {
    const existingUser = await Admin.findOne({email : email});
    if (!existingUser) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password , existingUser.password);

    if (!passwordMatch ) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
    res.status(200).json({ user: existingUser, token: token, message: 'Admin login successful' });
    console.log(token);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/Logout', function (req, res) {
  res.status(200).json({ message: 'User logged out successfully' });
});

// Sell endpoint
app.post('/Sell', AuthContext, postData);

//service endpoint
app.post('/Services',AuthContext,postServiceData);

router.get('/sales', async (req, res) => {
  try {
    const vehicles = await postData.find({}, 'name vehicleModel status');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
