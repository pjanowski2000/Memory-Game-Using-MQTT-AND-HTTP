const MQTT = require("async-mqtt");
const client = MQTT.connect("tcp:10.45.3.14:1883");


  const simple_chat = async () => {
    try {
      await client.subscribe("chat");
    } catch (e) {
      console.log(e.stack);
      process.exit();
    }
  };
  
  client.on("connect", simple_chat);
  client.on("message", (topic, message) => {
      let payload = message.toString();
      client.publish("chat", payload);
    
  });

  module.exports=simple_chat