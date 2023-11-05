const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qrCode) => {
  // Mostrar el código QR para que el usuario lo escanee
  console.log("Escanea este código QR con WhatsApp:");
  qrcode.generate(qrCode, { small: true });
});

client.on('ready', () => {
  console.log('El bot de WhatsApp está listo para recibir mensajes.');
});

client.on('message', (message) => {
  if (message.body.toLowerCase() === 'holabot') {
    message.reply('Hola, soy un bot');
  } else if (message.body.toLowerCase() === 'chaobot') {
    message.reply('Chao, soy un bot');
  }
});

client.initialize();
