import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inventory from './Models/Inventory.js'; // Ensure the path to your Inventory model is correct

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Inventory data to insert
const inventoryData = [
    {
      "componentName": "Resistor",
      "componentId": "COMP001",
      "category": "Electronics",
      "quantity": 500,
      "unit": "pieces",
      "minimumQuantity": 50,
      "price": 0.1,
      "supplier": "ABC Electronics",
      "lastRestocked": "2025-03-25"
    },
    {
      "componentName": "Capacitor",
      "componentId": "COMP002",
      "category": "Electronics",
      "quantity": 300,
      "unit": "pieces",
      "minimumQuantity": 30,
      "price": 0.2,
      "supplier": "XYZ Supplies",
      "lastRestocked": "2025-03-20"
    },
    {
      "componentName": "Inductor",
      "componentId": "COMP003",
      "category": "Electronics",
      "quantity": 200,
      "unit": "pieces",
      "minimumQuantity": 20,
      "price": 0.3,
      "supplier": "Electro World",
      "lastRestocked": "2025-03-18"
    },
    {
      "componentName": "Diode",
      "componentId": "COMP004",
      "category": "Electronics",
      "quantity": 400,
      "unit": "pieces",
      "minimumQuantity": 40,
      "price": 0.05,
      "supplier": "Semi Conductors Ltd",
      "lastRestocked": "2025-03-22"
    },
    {
      "componentName": "Transistor",
      "componentId": "COMP005",
      "category": "Electronics",
      "quantity": 350,
      "unit": "pieces",
      "minimumQuantity": 35,
      "price": 0.4,
      "supplier": "Semi Conductors Ltd",
      "lastRestocked": "2025-03-24"
    },
    {
      "componentName": "Arduino Uno",
      "componentId": "COMP006",
      "category": "Microcontrollers",
      "quantity": 50,
      "unit": "units",
      "minimumQuantity": 5,
      "price": 25,
      "supplier": "Tech World",
      "lastRestocked": "2025-03-15"
    },
    {
      "componentName": "Raspberry Pi 4",
      "componentId": "COMP007",
      "category": "Microcontrollers",
      "quantity": 20,
      "unit": "units",
      "minimumQuantity": 2,
      "price": 35,
      "supplier": "Pi Store",
      "lastRestocked": "2025-03-10"
    },
    {
      "componentName": "ESP32 Module",
      "componentId": "COMP008",
      "category": "Microcontrollers",
      "quantity": 40,
      "unit": "units",
      "minimumQuantity": 4,
      "price": 12,
      "supplier": "IoT Components",
      "lastRestocked": "2025-03-17"
    },
    {
      "componentName": "Breadboard",
      "componentId": "COMP009",
      "category": "Tools",
      "quantity": 100,
      "unit": "pieces",
      "minimumQuantity": 10,
      "price": 2,
      "supplier": "Maker Supplies",
      "lastRestocked": "2025-03-18"
    },
    {
      "componentName": "Jumper Wires",
      "componentId": "COMP010",
      "category": "Cables",
      "quantity": 200,
      "unit": "sets",
      "minimumQuantity": 20,
      "price": 1.5,
      "supplier": "Wire World",
      "lastRestocked": "2025-03-22"
    },
    {
      "componentName": "Servo Motor",
      "componentId": "COMP011",
      "category": "Motors",
      "quantity": 30,
      "unit": "units",
      "minimumQuantity": 3,
      "price": 10,
      "supplier": "Motor Hub",
      "lastRestocked": "2025-03-12"
    },
    {
      "componentName": "Stepper Motor",
      "componentId": "COMP012",
      "category": "Motors",
      "quantity": 25,
      "unit": "units",
      "minimumQuantity": 2,
      "price": 15,
      "supplier": "Motor Hub",
      "lastRestocked": "2025-03-14"
    },
    {
      "componentName": "LCD Display",
      "componentId": "COMP013",
      "category": "Displays",
      "quantity": 40,
      "unit": "units",
      "minimumQuantity": 4,
      "price": 8,
      "supplier": "Display World",
      "lastRestocked": "2025-03-16"
    },
    {
      "componentName": "OLED Display",
      "componentId": "COMP014",
      "category": "Displays",
      "quantity": 30,
      "unit": "units",
      "minimumQuantity": 3,
      "price": 12,
      "supplier": "Display World",
      "lastRestocked": "2025-03-17"
    },
    {
      "componentName": "Temperature Sensor",
      "componentId": "COMP015",
      "category": "Sensors",
      "quantity": 60,
      "unit": "units",
      "minimumQuantity": 6,
      "price": 5,
      "supplier": "Sensor Hub",
      "lastRestocked": "2025-03-19"
    },
    {
      "componentName": "Ultrasonic Sensor",
      "componentId": "COMP016",
      "category": "Sensors",
      "quantity": 40,
      "unit": "units",
      "minimumQuantity": 4,
      "price": 7,
      "supplier": "Sensor Hub",
      "lastRestocked": "2025-03-21"
    }
  ]
  ;

// Insert data into MongoDB
const seedInventory = async () => {
  try {
    await connectDB();
    await Inventory.deleteMany(); // Optional: Clear existing data
    const inserted = await Inventory.insertMany(inventoryData);
    console.log(`Inserted ${inserted.length} inventory items`);
    process.exit();
  } catch (error) {
    console.error('Error seeding inventory:', error.message);
    process.exit(1);
  }
};

seedInventory();