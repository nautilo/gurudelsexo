const express = require('express');
const qrcode = require('qrcode'); // Asumiendo que estás utilizando la biblioteca 'qrcode' para generar códigos QR.
const app = express();

// Lógica para generar el código QR
const generateQRCode = async (text) => {
  try {
    return await qrcode.toDataURL(text);
  } catch (error) {
    console.error('Error generando el código QR:', error);
    return null;
  }
}

// Ruta para mostrar el código QR
app.get('/qr', async (req, res) => {
  // Genera el código QR con el contenido deseado (puede ser dinámico)
  const qrCodeText = 'Hola, soy un bot de WhatsApp!';
  const qrCodeDataURL = await generateQRCode(qrCodeText);

  // Muestra el código QR en la respuesta
  if (qrCodeDataURL) {
    res.type('image/png');
    res.send(qrCodeDataURL);
  } else {
    res.status(500).send('Error generando el código QR');
  }
});

// Iniciar el servidor Express
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
