import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  quantity: Number
});

const Car = mongoose.model('car', carSchema);

export default Car;
