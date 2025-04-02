import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    componentName: {
      type: String,
      required: [true, 'Please provide the component name'],
    },
    componentId: {
      type: String,
      required: [true, 'Please provide the component ID'],
      unique: true, // Ensure each component ID is unique
    },
    category: {
      type: String,
      required: [true, 'Please provide the category'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide the quantity'],
      min: [0, 'Quantity cannot be negative'],
    },
    unit: {
      type: String,
      required: [true, 'Please provide the unit (e.g., pieces, units)'],
    },
    minimumQuantity: {
      type: Number,
      required: [true, 'Please provide the minimum quantity'],
      min: [0, 'Minimum quantity cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the price'],
      min: [0, 'Price cannot be negative'],
    },
    supplier: {
      type: String,
      required: [true, 'Please provide the supplier name'],
    },
    lastRestocked: {
      type: Date,
      required: [true, 'Please provide the last restocked date'],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;