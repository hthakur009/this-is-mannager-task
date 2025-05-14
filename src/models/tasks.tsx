import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  addedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

export const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);
