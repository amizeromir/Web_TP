import express from 'express';
import mongoose from 'mongoose';
import mqtt from 'mqtt';
import dotenv from 'dotenv';
import cors from 'cors';
import SensorData from './models/SensorData.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur MongoDB:', err.message));

// Connexion MQTT
const mqttClient = mqtt.connect(process.env.MQTT_BROKER);

mqttClient.on('connect', () => {
  console.log('✅ Connecté à MQTT');
  mqttClient.subscribe('poulailler/#');
});

mqttClient.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const data = new SensorData({
      type: payload.type,
      value: payload.value
    });
    await data.save();
    console.log('💾 Donnée sauvegardée:', data);
  } catch (err) {
    console.error('❌ Erreur MQTT:', err.message);
  }
});

// API REST
app.get('/api/data', async (req, res) => {
  const data = await SensorData.find().sort({ timestamp: -1 }).limit(10);
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));

