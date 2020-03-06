import * as mongoose from "mongoose";

export interface Drawing extends mongoose.Document {
  name: string;
  tags: string[];
  data: string;
}

export const drawingSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  data: String
});

const drawingModel = mongoose.model<Drawing>('Drawing', drawingSchema);
export default drawingModel;
