const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const app = express();

// Crear una instancia del cliente de WhatsApp Web
const client = new Client();

let qrCodeData; // Variable para almacenar el código QR

// Cuando el cliente emite el evento "qr", almacenamos el código QR
client.on('qr', (qrCode) => {
  qrCodeData = qrCode; // Almacenar el código QR en la variable
  console.log('Escanea el código QR con tu teléfono.');
});

// Cuando el cliente está listo, inicia el servidor Express
client.on('ready', () => {
  console.log('El bot está listo para recibir mensajes.');

  // Iniciar el servidor Express y proporcionar el código QR en la ruta raíz
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Aplicación escuchando en el puerto ${port}`);
  });
});

// Inicializar el cliente de WhatsApp Web
client.initialize();

// Ruta para mostrar el código QR en la página web
app.get('/', (req, res) => {
  if (qrCodeData) {
    // Genera el código QR en formato de imagen y envíalo como respuesta
    qrcode.toDataURL(qrCodeData, (err, url) => {
      if (err) {
        console.error('Error generando el código QR:', err);
        res.status(500).send('Error generando el código QR');
      } else {
        res.send(`<img src="${url}" alt="Código QR">`);
      }
    });
  } else {
    res.status(404).send('Código QR no disponible');
  }
});
