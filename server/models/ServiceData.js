// serviceData.js
import mongoose from 'mongoose';

// Define a schema for the ServiceData collection
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
    status: { type: String, required: true },
});

// Create a model for the ServiceData collection
const ServiceData = mongoose.model('ServiceData', ServiceDataSchema);

export default ServiceData;
