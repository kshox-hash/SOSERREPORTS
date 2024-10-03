const express = require('express');
const path = require('path');
const cors = require('cors')
const { exec } = require('child_process');

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


app.listen(port, () => {
    console.log(`Server up in ${port}`);


    // Abre automáticamente el navegador en localhost:3000
    exec(`start http://localhost:${port}`, (err) => {
        if (err) {
            console.error('Failed to open browser:', err);
        }
    });
});
