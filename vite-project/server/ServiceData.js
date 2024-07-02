// sellData.js
import mongoose from 'mongoose';

// Define a schema for the SellData collection
const ServiceDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    vehicleCompany: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User collection
});

// Create a model for the SellData collection
const ServiceData = mongoose.model('ServiceData', ServiceDataSchema);

const postServiceData = async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, phone, serviceType, vehicleCompany, vehicleModel, vehicleNumber, date, description} = req.body;

        // Create a new SellData document
        const result = await ServiceData.create({name, email, phone, serviceType, vehicleCompany, vehicleModel, vehicleNumber, date, description, userId: req.userId  // Include the userId from the request object
        });

        res.status(201).json({ data: result, message: 'Data added successfully' });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default postServiceData;
