var express = require('express');
var app = express();
const port = 3200;
app.use(express.json());

//mongodb

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("DB Online");
  db.close();
});

//fin mongodb
app.listen(port, function () {
    console.log('App listening on port ' + port);
});

app.get('/', function (req, res) { //homepage
    res.status(200);
    res.send('Hello World!');
});

app.get('/envio/:Id', function (req, res) { //consulta de 1 envio especifico
    
    //conexion DB

    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var dbo = client.db("local");
        var query = {
            "_id": req.params.Id
          };
          dbo.collection('Envios').find(query).toArray(function(err, results) {
            if (err) {
              console.log(err);
            }
            else{
              res.end(JSON.stringify(results));
              client.close();
            }
      });
    })
    //termino conexion
});

app.post('/envio', function (req, res) { //crear envio
    res.status(200);
    //conexion DB

    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var dbo = client.db("local");
        console.log(req.body);
          dbo.collection('Envios').insertOne(req.body, function(err, response) {
            if (err) throw err;
            else{
              res.end(JSON.stringify(response));
              client.close();
            }
      });
    })

    //termino conexion
    //creacion del nuevo envio
    res.send('Nuevo envio creado');
});

/* app.update('/envio/:Id', function (req, res) { //modificar envio
    res.status(200);
    res.json({ "ENVIO" : { 'status' : 'demorado' , "ID" : req.params.Id , "Destino" : "Calle falsa 123" , "Remitente" : "Juan Gonzalez"}})
}); */
