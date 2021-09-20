const express = require('express');
const app = express();

app.get('/',(req,res) => {
    // res.sendStatus(200)
    res.status(200).send({a: 1})
})
app.get('/products',(req,res) => {
    res.send(req.query)
})

app.listen(3000)
