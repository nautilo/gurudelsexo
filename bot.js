const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const app = express();

// Crear una instancia del cliente de WhatsApp Web
const client = new Client();

// Cuando el cliente emite el evento "qr", generamos y mostramos el código QR
client.on('qr', (qrCode) => {
  // Renderiza el código QR en la consola
  qrcode.generate(qrCode, { small: true });
  console.log('Escanea el código QR con tu teléfono.');

  // También puedes enviar el código QR al cliente web a través de una ruta
  // En este ejemplo, podríamos usar una variable global o una base de datos temporal
  // para almacenar el código QR y luego proporcionar una ruta para mostrarlo en la aplicación web.
});

// Cuando el cliente está listo, inicia el servidor Express
client.on('ready', () => {
  console.log('El bot está listo para recibir mensajes.');
});

// Escucha los mensajes entrantes
client.on('message', async (message) => {
  if (message.body.toLowerCase() === 'holabot') {
    // Responder "Hola, soy un bot." al mensaje "holabot"
    message.reply('Hola, soy un bot.');
  } else if (message.body.toLowerCase() === 'chaobot') {
    // Responder "Chao, soy un bot." al mensaje "chaobot"
    message.reply('Chao, soy un bot.');
  }
});

// Inicializar el cliente de WhatsApp Web
client.initialize();

// Ruta para mostrar el código QR en la aplicación web
app.get('/', (req, res) => {
  // Puedes agregar aquí la lógica para mostrar el código QR en la respuesta
  // Utiliza la misma lógica para mostrar el código QR almacenado anteriormente si es necesario
  res.send('Aquí debería mostrarse el código QR.');
});

// Iniciar el servidor Express
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
