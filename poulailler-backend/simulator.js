import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://localhost:1883'); // adapte si ton broker est distant

client.on('connect', () => {
  console.log('✅ Simulateur connecté à MQTT');

  setInterval(() => {
    const temperature = (20 + Math.random() * 5).toFixed(1);
    const humidity = (50 + Math.random() * 10).toFixed(1);
    const ammonia = (2 + Math.random()).toFixed(2);

    const payloads = [
      { type: 'temperature', value: parseFloat(temperature) },
      { type: 'humidity', value: parseFloat(humidity) },
      { type: 'ammonia', value: parseFloat(ammonia) }
    ];

    payloads.forEach(data => {
      client.publish('poulailler/data', JSON.stringify(data));
      console.log(`📡 Donnée envoyée: ${JSON.stringify(data)}`);
    });
  }, 5000); // toutes les 5 secondes
});

