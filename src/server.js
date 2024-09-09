const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();
const port = 3000;
const routes = require('../router/routes');

app.use(express.json())
app.use(express.urlencoded({}))
app.use(cors())

// set pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..','view'));
app.use(express.static(path.join(__dirname, '../public')));

//manage routes
app.use(routes)


// fire server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
