import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: String,
  water: String,
  fertilize: String,
  placement: String,
  sort: Number,
  image_url: String,
  created: Date,
  updated: Date
});

plantSchema.pre('save', function(next) {
  if (!this.created) {
    this.created = new Date();
  }

  next();
});

plantSchema.pre('findOneAndUpdate', function(next) {
  this.update({}, { $set: { updated: new Date() } });
  next();
});

export default mongoose.model('plants', plantSchema);
