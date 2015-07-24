var container = require('./container');
var express = require('express');
var app = express();

app.use(container.middlewares.bodyParser.json());
app.use(container.middlewares.bodyParser.urlencoded({ extended: true }));
app.use(container.middlewares.security);
app.get('/', function (req, res) {
  res.send('Dyalna Tech Server Running ...');
});

// Feed
app.get('/feed', container.controllers.projectController.feedAction);

// Project & Stars
app.get('/project', container.controllers.projectController.findAllAction);
app.get('/project/:slug', container.controllers.projectController.findOneAction);
app.post('/project/:slug/star', container.middlewares.authentication, container.controllers.starController.createAction);
app.delete('/project/:slug/star', container.middlewares.authentication, container.controllers.starController.removeAction);
app.post('/project/:slug/maker', container.middlewares.authentication, container.controllers.projectController.addMakerAction);
app.get('/project/:slug/makers', container.controllers.projectController.makersAction);
app.get('/project/:slug/stars', container.controllers.starController.projectStarsAction);
app.post('/project', container.middlewares.authentication, container.controllers.projectController.createAction);

// Stars
app.get('/star', container.middlewares.authentication, container.controllers.starController.myStarsAction);

app.listen(container.config.port);
console.log('Dyalna Tech Server running on Port %s', container.config.port);
