import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: String,
  water: String,
  fertilize: String,
  placement: String,
  sort: Number
});

// plantSchema.pre('save', next => {
//   if (!this.created_at) {
//     this.created_at = new Date();
//   }

//   next();
// });

// plantSchema.pre('findOneAndUpdate', next => {
//   console.log('updating... setting updated at');
//   this.updated_at = new Date();
//   next();
// });

export default mongoose.model('plants', plantSchema);
