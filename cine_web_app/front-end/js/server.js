const express = require('express');
const path = require('path');
const app = express();

// Configurar carpetas estáticas
app.use('/css', express.static(path.join(__dirname, '../front-end/css')));
app.use('/js', express.static(path.join(__dirname, '../front-end/js')));
app.use('/images', express.static(path.join(__dirname, '../front-end/images')));

// Servir páginas HTML dinámicamente
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, '../front-end/views', `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error al cargar ${page}.html:`, err);
      res.status(404).send('Página no encontrada');
    }
  });
});

// Redirigir rutas no definidas a home.html, ignorando rutas estáticas
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/css') || req.path.startsWith('/js') || req.path.startsWith('/images')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../views/home.html'), (err) => {
    if (err) {
      console.error('Error al cargar home.html:', err);
      res.status(500).send('Error en el servidor');
    }
  });
});

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
