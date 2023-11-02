const express = require('express');
const { Client } = require('whatsapp-web.js'); // Importa whatsapp-web.js
const app = express();
const port = process.env.PORT || 3000;

// Configura una instancia de whatsapp-web.js
const client = new Client();

client.on('qr', (qr) => {
  // En este punto, el código QR ha sido generado, y puedes enviarlo a tu página web
  // Puedes enviar el `qr` a tu página a través de una respuesta HTTP o cualquier otro método que elijas
  console.log('QR Code generated:', qr);
});

client.initialize();

app.get('/', (req, res) => {
  // Puedes personalizar la página para mostrar el código QR
  res.send(`
    <html>
      <head>
        <title>WhatsApp Web QR Code</title>
      </head>
      <body style="text-align: center;">
        <h1>Escanear el código QR</h1>
        <img src="${client.qrCode}" alt="QR Code">
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
