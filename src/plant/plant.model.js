import mongoose from 'mongoose';

export default mongoose.model(
  'plants',
  new mongoose.Schema({
    name: String,
    water: String,
    fertilize: String,
    placement: String,
    sort: Number
  })
);
