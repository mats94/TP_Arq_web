var express = require('express');
var app = express();
const port = 3200;

app.get('/', function (req, res) {
    res.status(200);
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log('App listening on port ' + port);
});
