const express = require('express');
const qr = require('qrcode'); // Utilizamos la biblioteca 'qrcode' para generar códigos QR.
const { Client } = require('whatsapp-web.js');
const app = express();

// Crear una instancia del cliente de WhatsApp Web
const client = new Client();

// Cuando el cliente emite el evento "qr", generamos y mostramos el código QR
client.on('qr', async (qrCode) => {
  // Genera el código QR como una imagen y proporciona una URL para mostrarlo
  const qrCodeURL = await qr.toDataURL(qrCode);

  // Muestra el código QR en la respuesta de la ruta principal
  app.get('/', (req, res) => {
    res.send(`
      <html>
        <body>
          <img src="${qrCodeURL}" alt="QR Code" />
          <p>Escanea el código QR con tu teléfono para iniciar sesión en WhatsApp Web.</p>
        </body>
      </html>
    `);
  });

  console.log('Escanea el código QR con tu teléfono.');
});

// Manejador de mensajes entrantes
client.on('message', (message) => {
  const body = message.body.toLowerCase();
  if (body === 'holabot') {
    message.reply('Hola, soy un bot.');
  } else if (body === 'chaobot') {
    message.reply('Chao, soy un bot.');
  }
});

// Iniciar el servidor Express
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
  client.initialize(); // Inicializar el cliente de WhatsApp Web cuando el servidor esté listo.
});
