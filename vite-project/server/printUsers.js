const mongoose = require('mongoose');
const User = require('../../models/model'); // Adjust the path to your user model file
const Selldata = require('../../models/model'); // Adjust the path to your selldata model file

mongoose.connect('mongodb://localhost:27017/carsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const printUserData = async (req,res ) =>{
  try {
    // Fetch users
    const users = await User.find({}, 'email'); // Fetching only email field

    console.log('Users:');
    console.table(users); // Print users in a table format
    res.status(200).json(users);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default printUserData();
