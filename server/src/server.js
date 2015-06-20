var container = require('./container');
var express = require('express');
var app = express();

app.use(container.middlewares.bodyParser.json());
app.use(container.middlewares.bodyParser.urlencoded({ extended: true }));
app.use(container.middlewares.security);
app.get('/', function (req, res) {
  res.send('Dyalna Tech Server Running ...');
});

// Project
app.get('/project', container.controllers.projectController.findAllAction);
app.get('/project/:id', container.controllers.projectController.findOneAction);
app.post('/project', container.middlewares.authentication, container.controllers.projectController.createAction);

app.listen(container.config.port);
console.log('Dyalna Tech Server running on Port %s', container.config.port);
