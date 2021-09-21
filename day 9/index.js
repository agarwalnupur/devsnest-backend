const express = require('express');
const app = express()
const path = require('path')

app.set("views", path.join(__dirname,'views'))
app.set("view engine", "jade")
// console.log(__dirname);
// app.use('/', (req,res) => {
    // res.download(path.join(__dirname,'public/hello.txt'),'hello.txt')
    // res.sendFile(path.join(__dirname,'public/trial.html'))
    // res.render('index', {title: 'Express'})
// })
app.use('/files/:name',(req,res) => {
    res.sendFile(path.join(__dirname,'public/img1.jpeg'))
})
app.listen(3000);
