import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from './models/Sell.js';

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ASD_MERN", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB:", err));

app.post('/sell', async (req, res) => {
    try {
        const employee = await EmployeeModel.create(req.body);
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


