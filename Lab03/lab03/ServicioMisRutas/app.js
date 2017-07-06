console.log('Se inician los servicios');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static('static'));

var rutas = [];
var nextId = 0;

app.post('/misrutas/rutas', function(req, res) {
    console.log('POST /misrutas/rutas');
    var ruta = req.body;
    ruta.id = nextId++;
    rutas.push(ruta);
    res.send(ruta);
});

app.get('/misrutas/rutas', function(req, res) {
    console.log('GET /misrutas/rutas');
    res.send(rutas);
});

app.get('/misrutas/rutas/:id', function(req, res) {
    console.log('GET /misrutas/' + req.params.id);
    for (var i = 0; i < rutas.length; i++) {
        if (rutas[i].id == req.params.id) {
            res.send(rutas[i]);
            return;
        }
    }
    res.status(404).send('Not found');
});

app.put('/misrutas/rutas/:id', function(req, res) {
    console.log('PUT /misrutas/' + req.params.id);
    console.log(req.originalUrl);
    for (var i = 0; i < rutas.length; i++) {
        if (rutas[i].id == req.params.id) {
            rutas[i] = req.body;
            res.send(rutas[i]);
            return;
        }
    }
    res.status(404).send('Not found');
});

app.delete('/misrutas/rutas/:id', function(req, res) {
    console.log('DELETE /misrutas/' + req.params.id);
    console.log(req.originalUrl);
    for (var i = 0; i < rutas.length; i++) {
        if (rutas[i].id == req.params.id) {
            rutas.splice(i, 1);
            res.status(204).send();
            return;
        }
    }
    res.status(404).send('Not found');
});

app.listen(8080);