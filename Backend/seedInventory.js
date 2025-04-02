// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Inventory from './Models/Inventory.js';
// import Issue from './Models/Issue.js';

// dotenv.config();

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1);
//   }
// };

// // Inventory data to insert
// const inventoryData = [
//     {
//       "componentName": "Resistor",
//       "componentId": "COMP001",
//       "category": "Electronics",
//       "quantity": 500,
//       "unit": "pieces",
//       "minimumQuantity": 50,
//       "price": 0.1,
//       "supplier": "ABC Electronics",
//       "lastRestocked": "2025-03-25"
//     },
//     {
//       "componentName": "Capacitor",
//       "componentId": "COMP002",
//       "category": "Electronics",
//       "quantity": 300,
//       "unit": "pieces",
//       "minimumQuantity": 30,
//       "price": 0.2,
//       "supplier": "XYZ Supplies",
//       "lastRestocked": "2025-03-20"
//     },
//     {
//       "componentName": "Inductor",
//       "componentId": "COMP003",
//       "category": "Electronics",
//       "quantity": 200,
//       "unit": "pieces",
//       "minimumQuantity": 20,
//       "price": 0.3,
//       "supplier": "Electro World",
//       "lastRestocked": "2025-03-18"
//     },
//     {
//       "componentName": "Diode",
//       "componentId": "COMP004",
//       "category": "Electronics",
//       "quantity": 400,
//       "unit": "pieces",
//       "minimumQuantity": 40,
//       "price": 0.05,
//       "supplier": "Semi Conductors Ltd",
//       "lastRestocked": "2025-03-22"
//     },
//     {
//       "componentName": "Transistor",
//       "componentId": "COMP005",
//       "category": "Electronics",
//       "quantity": 350,
//       "unit": "pieces",
//       "minimumQuantity": 35,
//       "price": 0.4,
//       "supplier": "Semi Conductors Ltd",
//       "lastRestocked": "2025-03-24"
//     },
//     {
//       "componentName": "Arduino Uno",
//       "componentId": "COMP006",
//       "category": "Microcontrollers",
//       "quantity": 50,
//       "unit": "units",
//       "minimumQuantity": 5,
//       "price": 25,
//       "supplier": "Tech World",
//       "lastRestocked": "2025-03-15"
//     },
//     {
//       "componentName": "Raspberry Pi 4",
//       "componentId": "COMP007",
//       "category": "Microcontrollers",
//       "quantity": 20,
//       "unit": "units",
//       "minimumQuantity": 2,
//       "price": 35,
//       "supplier": "Pi Store",
//       "lastRestocked": "2025-03-10"
//     },
//     {
//       "componentName": "ESP32 Module",
//       "componentId": "COMP008",
//       "category": "Microcontrollers",
//       "quantity": 40,
//       "unit": "units",
//       "minimumQuantity": 4,
//       "price": 12,
//       "supplier": "IoT Components",
//       "lastRestocked": "2025-03-17"
//     },
//     {
//       "componentName": "Breadboard",
//       "componentId": "COMP009",
//       "category": "Tools",
//       "quantity": 100,
//       "unit": "pieces",
//       "minimumQuantity": 10,
//       "price": 2,
//       "supplier": "Maker Supplies",
//       "lastRestocked": "2025-03-18"
//     },
//     {
//       "componentName": "Jumper Wires",
//       "componentId": "COMP010",
//       "category": "Cables",
//       "quantity": 200,
//       "unit": "sets",
//       "minimumQuantity": 20,
//       "price": 1.5,
//       "supplier": "Wire World",
//       "lastRestocked": "2025-03-22"
//     },
//     {
//       "componentName": "Servo Motor",
//       "componentId": "COMP011",
//       "category": "Motors",
//       "quantity": 30,
//       "unit": "units",
//       "minimumQuantity": 3,
//       "price": 10,
//       "supplier": "Motor Hub",
//       "lastRestocked": "2025-03-12"
//     },
//     {
//       "componentName": "Stepper Motor",
//       "componentId": "COMP012",
//       "category": "Motors",
//       "quantity": 25,
//       "unit": "units",
//       "minimumQuantity": 2,
//       "price": 15,
//       "supplier": "Motor Hub",
//       "lastRestocked": "2025-03-14"
//     },
//     {
//       "componentName": "LCD Display",
//       "componentId": "COMP013",
//       "category": "Displays",
//       "quantity": 40,
//       "unit": "units",
//       "minimumQuantity": 4,
//       "price": 8,
//       "supplier": "Display World",
//       "lastRestocked": "2025-03-16"
//     },
//     {
//       "componentName": "OLED Display",
//       "componentId": "COMP014",
//       "category": "Displays",
//       "quantity": 30,
//       "unit": "units",
//       "minimumQuantity": 3,
//       "price": 12,
//       "supplier": "Display World",
//       "lastRestocked": "2025-03-17"
//     },
//     {
//       "componentName": "Temperature Sensor",
//       "componentId": "COMP015",
//       "category": "Sensors",
//       "quantity": 60,
//       "unit": "units",
//       "minimumQuantity": 6,
//       "price": 5,
//       "supplier": "Sensor Hub",
//       "lastRestocked": "2025-03-19"
//     },
//     {
//       "componentName": "Ultrasonic Sensor",
//       "componentId": "COMP016",
//       "category": "Sensors",
//       "quantity": 40,
//       "unit": "units",
//       "minimumQuantity": 4,
//       "price": 7,
//       "supplier": "Sensor Hub",
//       "lastRestocked": "2025-03-21"
//     },
//       {
//         "componentName": "Lithium-Ion Battery",
//         "componentId": "COMP017",
//         "category": "Power Supplies",
//         "quantity": 100,
//         "unit": "units",
//         "minimumQuantity": 10,
//         "price": 15,
//         "supplier": "Battery World",
//         "lastRestocked": "2025-03-20"
//       },
//       {
//         "componentName": "Power Adapter 12V",
//         "componentId": "COMP018",
//         "category": "Power Supplies",
//         "quantity": 75,
//         "unit": "units",
//         "minimumQuantity": 7,
//         "price": 8,
//         "supplier": "Power Tech",
//         "lastRestocked": "2025-03-19"
//       },
//       {
//         "componentName": "Solar Panel 10W",
//         "componentId": "COMP019",
//         "category": "Power Supplies",
//         "quantity": 20,
//         "unit": "units",
//         "minimumQuantity": 2,
//         "price": 25,
//         "supplier": "Solar Experts",
//         "lastRestocked": "2025-03-15"
//       },
//       {
//         "componentName": "Thermistor",
//         "componentId": "COMP020",
//         "category": "Sensors",
//         "quantity": 90,
//         "unit": "pieces",
//         "minimumQuantity": 9,
//         "price": 1.2,
//         "supplier": "Sensor Solutions",
//         "lastRestocked": "2025-03-22"
//       },
//       {
//         "componentName": "Gas Sensor",
//         "componentId": "COMP021",
//         "category": "Sensors",
//         "quantity": 35,
//         "unit": "units",
//         "minimumQuantity": 4,
//         "price": 20,
//         "supplier": "Sensor Solutions",
//         "lastRestocked": "2025-03-10"
//       },
//       {
//         "componentName": "Vibration Motor",
//         "componentId": "COMP022",
//         "category": "Motors",
//         "quantity": 45,
//         "unit": "units",
//         "minimumQuantity": 5,
//         "price": 5,
//         "supplier": "Motor Tech",
//         "lastRestocked": "2025-03-18"
//       },
//       {
//         "componentName": "Brushless DC Motor",
//         "componentId": "COMP023",
//         "category": "Motors",
//         "quantity": 30,
//         "unit": "units",
//         "minimumQuantity": 3,
//         "price": 25,
//         "supplier": "Motor Tech",
//         "lastRestocked": "2025-03-15"
//       },
//       {
//         "componentName": "HDMI Cable",
//         "componentId": "COMP024",
//         "category": "Cables",
//         "quantity": 100,
//         "unit": "pieces",
//         "minimumQuantity": 10,
//         "price": 5,
//         "supplier": "Cable Express",
//         "lastRestocked": "2025-03-16"
//       },
//       {
//         "componentName": "USB to TTL Converter",
//         "componentId": "COMP025",
//         "category": "Cables",
//         "quantity": 50,
//         "unit": "pieces",
//         "minimumQuantity": 5,
//         "price": 7,
//         "supplier": "Tech Wires",
//         "lastRestocked": "2025-03-18"
//       },
//       {
//         "componentName": "LCD 7-inch Touchscreen",
//         "componentId": "COMP026",
//         "category": "Displays",
//         "quantity": 25,
//         "unit": "units",
//         "minimumQuantity": 3,
//         "price": 45,
//         "supplier": "Display Tech",
//         "lastRestocked": "2025-03-14"
//       },
//       {
//         "componentName": "e-Paper Display",
//         "componentId": "COMP027",
//         "category": "Displays",
//         "quantity": 15,
//         "unit": "units",
//         "minimumQuantity": 2,
//         "price": 35,
//         "supplier": "Display Tech",
//         "lastRestocked": "2025-03-10"
//       },
//       {
//         "componentName": "3D Printer Filament PLA",
//         "componentId": "COMP028",
//         "category": "3D Printing",
//         "quantity": 100,
//         "unit": "spools",
//         "minimumQuantity": 10,
//         "price": 20,
//         "supplier": "3D Print Hub",
//         "lastRestocked": "2025-03-12"
//       },
//       {
//         "componentName": "Stepper Motor Driver",
//         "componentId": "COMP029",
//         "category": "Robotics",
//         "quantity": 40,
//         "unit": "units",
//         "minimumQuantity": 4,
//         "price": 15,
//         "supplier": "Robot Supplies",
//         "lastRestocked": "2025-03-19"
//       },
//       {
//         "componentName": "LiDAR Sensor",
//         "componentId": "COMP030",
//         "category": "Robotics",
//         "quantity": 20,
//         "unit": "units",
//         "minimumQuantity": 2,
//         "price": 120,
//         "supplier": "Robot Vision",
//         "lastRestocked": "2025-03-11"
//       },
//       {
//         "componentName": "Mechanical Coupler",
//         "componentId": "COMP031",
//         "category": "Mechanical",
//         "quantity": 60,
//         "unit": "pieces",
//         "minimumQuantity": 6,
//         "price": 8,
//         "supplier": "Mech Store",
//         "lastRestocked": "2025-03-14"
//       },
//       {
//         "componentName": "Heat Sink",
//         "componentId": "COMP032",
//         "category": "Hardware",
//         "quantity": 80,
//         "unit": "pieces",
//         "minimumQuantity": 8,
//         "price": 6,
//         "supplier": "Hardware Tech",
//         "lastRestocked": "2025-03-20"
//       },
//       {
//         "componentName": "Cooling Fan 12V",
//         "componentId": "COMP033",
//         "category": "Hardware",
//         "quantity": 50,
//         "unit": "units",
//         "minimumQuantity": 5,
//         "price": 12,
//         "supplier": "Hardware Tech",
//         "lastRestocked": "2025-03-18"
//       },
//       {
//         "componentName": "Multimeter",
//         "componentId": "COMP034",
//         "category": "Tools",
//         "quantity": 20,
//         "unit": "units",
//         "minimumQuantity": 2,
//         "price": 25,
//         "supplier": "Tech Tools",
//         "lastRestocked": "2025-03-12"
//       },
//       {
//         "componentName": "Soldering Iron",
//         "componentId": "COMP035",
//         "category": "Tools",
//         "quantity": 30,
//         "unit": "units",
//         "minimumQuantity": 3,
//         "price": 15,
//         "supplier": "Tech Tools",
//         "lastRestocked": "2025-03-10"
//       },
//       {
//         "componentName": "Raspberry Pi Camera Module",
//         "componentId": "COMP036",
//         "category": "Raspberry Pi",
//         "quantity": 20,
//         "unit": "units",
//         "minimumQuantity": 2,
//         "price": 25,
//         "supplier": "Pi Store",
//         "lastRestocked": "2025-03-08"
//       },
//       {
//         "componentName": "Arduino Mega 2560",
//         "componentId": "COMP037",
//         "category": "Arduino",
//         "quantity": 15,
//         "unit": "units",
//         "minimumQuantity": 2,
//         "price": 35,
//         "supplier": "Tech World",
//         "lastRestocked": "2025-03-15"
//       },
//       {
//         "componentName": "Prototyping PCB Board",
//         "componentId": "COMP038",
//         "category": "Electronics",
//         "quantity": 150,
//         "unit": "pieces",
//         "minimumQuantity": 15,
//         "price": 2,
//         "supplier": "Circuit Boards Ltd",
//         "lastRestocked": "2025-03-13"
//       }
// ]
//   ;

// // Issue data
// const issueData = [];
// const statuses = ['pending', 'returned'];
// const purposes = [
//   'IoT Project - Smart Home',
//   'Robotics Competition',
//   'Embedded Systems Lab',
//   'Final Year Project',
//   'Research Project',
//   'Workshop - Arduino Basics',
//   'Mini Project - Weather Station',
//   'Hackathon Project',
//   'Lab Experiment - Sensors',
//   'Project - Home Automation'
// ];

// // Function to generate random date within last 6 months
// const getRandomDate = () => {
//   const now = new Date();
//   const sixMonthsAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000));
//   return new Date(sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime()));
// };

// // Function to generate expected return date (1-30 days from issue date)
// const getExpectedReturnDate = (issueDate) => {
//   const days = Math.floor(Math.random() * 30) + 1;
//   return new Date(issueDate.getTime() + (days * 24 * 60 * 60 * 1000));
// };

// // Insert data into MongoDB
// const seedData = async () => {
//   try {
//     await connectDB();

//     // Clear existing data
//     await Inventory.deleteMany();
//     await Issue.deleteMany();

//     // Insert inventory items
//     const inventoryItems = await Inventory.insertMany(inventoryData);
//     console.log(`Inserted ${inventoryItems.length} inventory items`);

//     // Create issues (audit log entries)
//     for (let i = 0; i < 50; i++) {
//       const randomComponent = inventoryItems[Math.floor(Math.random() * inventoryItems.length)];
//       const issueDate = getRandomDate();
//       const expectedReturnDate = getExpectedReturnDate(issueDate);
//       const status = statuses[Math.floor(Math.random() * statuses.length)];
//       const purpose = purposes[Math.floor(Math.random() * purposes.length)];
      
//       // Ensure quantity doesn't exceed available inventory
//       const maxQuantity = Math.min(randomComponent.quantity, 5);
//       const quantity = Math.floor(Math.random() * maxQuantity) + 1;

//       issueData.push({
//         studentName: `Student ${i + 1}`,
//         studentId: `STU${i + 1}`,
//         department: ['CSE', 'ECE', 'MECH', 'IT'][Math.floor(Math.random() * 4)],
//         componentId: randomComponent._id,
//         quantity: quantity,
//         issueDate: issueDate,
//         expectedReturnDate: expectedReturnDate,
//         purpose: purpose,
//         status: status
//       });

//       // Update inventory quantity if status is pending
//       if (status === 'pending') {
//         await Inventory.findByIdAndUpdate(
//           randomComponent._id,
//           { $inc: { quantity: -quantity } }
//         );
//       }
//     }

//     // Insert issues
//     const insertedIssues = await Issue.insertMany(issueData);
//     console.log(`Inserted ${insertedIssues.length} issues`);

//     console.log('Database seeding completed successfully');
//     process.exit();
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// };

// seedData();