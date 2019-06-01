var express = require('express');
var app = express();
const port = 3200;


//mongodb

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
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
    //res.status(200);
    //res.json({ "ENVIO" : { 'status' : 'demorado' , "ID" : req.params.Id , "Destino" : "Calle falsa 123" , "Remitente" : "Juan Perez"}})
    //conexion DB

    MongoClient.connect(url, function(err, client) {
        //assert.equal(null, err);
        console.log("Connected successfully to server");
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
        assert.equal(null, err);
        console.log("Connected successfully to server");
       
        const db = client.db(dbName);
        //db.collection('Envios')
        client.close();
      });

    //termino conexion
    //creacion del nuevo envio
    res.send('Nuevo envio creado');
});

/* app.update('/envio/:Id', function (req, res) { //modificar envio
    res.status(200);
    res.json({ "ENVIO" : { 'status' : 'demorado' , "ID" : req.params.Id , "Destino" : "Calle falsa 123" , "Remitente" : "Juan Gonzalez"}})
}); */
