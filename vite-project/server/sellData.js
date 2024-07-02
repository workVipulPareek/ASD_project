// sellData.js
import mongoose from 'mongoose';

// Define a schema for the SellData collection
const sellDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleCompany: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User collection
});

// Create a model for the SellData collection
const SellData = mongoose.model('SellData', sellDataSchema);

const postData = async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, phone, vehicleNumber, vehicleModel, vehicleCompany, description , status} = req.body;

        // Create a new SellData document
        const result = await SellData.create({
            name,
            email,
            phone,
            vehicleNumber,
            vehicleModel,
            vehicleCompany,
            description,
            status ,
            userId: req.userId  // Include the userId from the request object
        });

        res.status(201).json({ data: result, message: 'Data added successfully' });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default postData;
