const express = require('express');

const app = express();

const products = [{ id: 1, brand: 'Apple', model: 'Iphone 13', price: 1000 }];

app.get('/api/products', (req, res) => {
    res.status(200);
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    res.status(200);
    res.json(products[0]);
});

// app.listen(4000, () => console.log('riunning'));

module.exports = app;