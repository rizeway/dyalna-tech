var container = require('./container');
var express = require('express');
var app = express();

app.use(container.middlewares.bodyParser.json());
app.use(container.middlewares.bodyParser.urlencoded({ extended: true }));
app.use(container.middlewares.security);
app.get('/', function (req, res) {
  res.send('Dyalna Tech Server Running ...');
});

// Project & Stars
app.get('/project', container.controllers.projectController.findAllAction);
app.get('/project/:id', container.controllers.projectController.findOneAction);
app.post('/project/:id/star', container.controllers.starController.createAction);
app.delete('/project/:id/star', container.controllers.starController.removeAction);
app.post('/project/:id/maker', container.controllers.projectController.addMakerAction);
app.get('/project/:id/makers', container.controllers.projectController.makersAction);
app.post('/project', container.middlewares.authentication, container.controllers.projectController.createAction);

// Stars
app.get('/star', container.controllers.starController.myStarsAction);

app.listen(container.config.port);
console.log('Dyalna Tech Server running on Port %s', container.config.port);
