import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: Schema.Types.String, required: true, trim: true },
    description: { type: Schema.Types.String, required: true, trim: true },
    status: { type: Schema.Types.String, required: true },
  },
  {
    timestamps: true,
  }
);
export const Task = mongoose.model<ITask>("Task", TaskSchema);

export const getTasks = () => Task.find();
