import express from 'express';
import Inventory from '../Models/Inventory.js';

const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new inventory item
router.post('/', async (req, res) => {
  const {
    componentName,
    componentId,
    category,
    quantity,
    unit,
    minimumQuantity,
    price,
    supplier,
    lastRestocked,
  } = req.body;

  try {
    const newInventory = await Inventory.create({
      componentName,
      componentId,
      category,
      quantity,
      unit,
      minimumQuantity,
      price,
      supplier,
      lastRestocked,
    });

    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an inventory item
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;