import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const Component = mongoose.model("Component", componentSchema);

export default Component;
