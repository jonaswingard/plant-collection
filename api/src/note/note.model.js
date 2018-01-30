import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  plant_id: String,
  text: String,
  created: Date,
  modified: Date,
  created: Date,
  updated: Date
});

noteSchema.pre('save', function(next) {
  if (!this.created) {
    this.created = new Date();
  }

  next();
});

noteSchema.pre('findOneAndUpdate', function(next) {
  this.update({}, { $set: { updated: new Date() } });
  next();
});

export default mongoose.model('notes', noteSchema);
