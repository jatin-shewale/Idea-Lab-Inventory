import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    component: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: [true, "Please provide the component ID"],
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the requester ID"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the quantity"],
      min: [1, "Quantity must be at least 1"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    purpose: {
      type: String,
      required: [true, "Please provide the purpose of the request"],
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
