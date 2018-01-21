import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  plant_id: String,
  text: String,
  created: Date,
  modified: Date
});

export default mongoose.model('notes', noteSchema);
