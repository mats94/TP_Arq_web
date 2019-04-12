var express = require('express');
var app = express();
const port = 3200;

app.listen(port, function () {
    console.log('App listening on port ' + port);
});

app.get('/', function (req, res) { //homepage
    res.status(200);
    res.send('Hello World!');
});

app.get('/envio/:Id', function (req, res) { //consulta de 1 envio especifico
    res.status(200);
    res.json({ "ENVIO" : { 'status' : 'demorado' , "ID" : req.params.Id , "Destino" : "Calle falsa 123" , "Remitente" : "Juan Perez"}})
});

app.post('/envio', function (req, res) { //crear envio
    res.status(200);
    //creacion del nuevo envio
    res.send('Nuevo envio creado');
});

app.update('/envio/:Id', function (req, res) { //modificar envio
    res.status(200);
    res.json({ "ENVIO" : { 'status' : 'demorado' , "ID" : req.params.Id , "Destino" : "Calle falsa 123" , "Remitente" : "Juan Gonzalez"}})
});