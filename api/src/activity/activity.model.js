import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  plant_id: String,
  type: String,
  date: Date,
  created: Date,
  modified: Date
});

export default mongoose.model('activities', activitySchema);
