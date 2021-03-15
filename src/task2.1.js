const express = require('express');
const app = express();
const router = require('./api/routes');

app.listen(3000);
app.use(express.json());
app.use('/', router);
app.use((req, res) => {
    res.status(404).send('<h1> Page not found </h1>');
});
