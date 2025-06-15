import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  type: String,
  value: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SensorData', sensorDataSchema);

