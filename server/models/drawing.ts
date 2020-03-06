import * as mongoose from "mongoose";

export interface Drawing extends mongoose.Document {
  name: string;
  tags: string[];
  data: string;
}

export const DrawingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: false
  },
  data: {
    type: String,
    required: true,
  }
});



const DrawingModel = mongoose.model<Drawing>('Drawing', DrawingSchema);
export default DrawingModel;
