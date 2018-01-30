import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  plant_id: String,
  type: String,
  date: Date,
  created: Date,
  updated: Date
});

activitySchema.pre('save', function(next) {
  if (!this.created) {
    this.created = new Date();
  }

  next();
});

activitySchema.pre('findOneAndUpdate', function(next) {
  this.update({}, { $set: { updated: new Date() } });
  next();
});

export default mongoose.model('activities', activitySchema);
