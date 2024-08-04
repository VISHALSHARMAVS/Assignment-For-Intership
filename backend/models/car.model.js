import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturingYear: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
},{timestamps:true});

const Car  = mongoose.model('Car', carSchema);
export default Car
