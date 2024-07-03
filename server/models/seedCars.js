const mongoose = require('mongoose'); // adjust the path as necessary

const cars = [
  {
    id: 1,
    image: "rollsroyce",
    name: "Rolls-Royce Phantom:",
    description: "Epitome of luxury and refinement with bespoke craftsmanship.",
    quantity: 5
  },
  {
    id: 2,
    image: "bentely",
    name: "Bentley Continental GT:",
    description: "Powerful grand tourer blending opulence with dynamic performance.",
    quantity: 3
  },
  {
    id: 3,
    image: "mercedes",
    name: "Mercedes-Maybach S-Class:",
    description: "Ultimate in chauffeur-driven luxury and cutting-edge technology.",
    quantity: 4
  },
  {
    id: 4,
    image: "bmw",
    name: "BMW 7 Series:",
    description: "Executive sedan known for its comfort, innovation, and driving dynamics.",
    quantity: 6
  },
  {
    id: 5,
    image: "audi",
    name: "Audi A8 L:",
    description: "Flagship sedan offering exceptional comfort, style, and advanced driver assistance systems.",
    quantity: 2
  },
  {
    id: 6,
    image: "defender",
    name: "Defender",
    description: "The Defender is a rugged, off-road capable SUV produced by Land Rover.",
    quantity: 7
  },
  {
    id: 7,
    image: "lexus",
    name: "Lexus LS 500h:",
    description: "Japanese luxury hybrid sedan renowned for its comfort and reliability.",
    quantity: 3
  },
  {
    id: 8,
    image: "volvo",
    name: "Volvo XC90 Excellence:",
    description: "Premium SUV offering Scandinavian luxury and advanced safety features.",
    quantity: 4
  },
  {
    id: 9,
    image: "maserati",
    name: "Maserati Quattroporte:",
    description: "Italian luxury sedan with a blend of sportiness and refined elegance.",
    quantity: 5
  },
];

mongoose.connect('mongodb://localhost:27017/vijay', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    return Car.insertMany(cars);
  })
  .then(() => {
    console.log('Car data inserted');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting car data:', err);
    mongoose.disconnect();
  });
