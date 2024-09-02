const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const routes = require('../router/routes');

// Configura el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..','view'));

app.use(routes)


// Inicia el servidor
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
