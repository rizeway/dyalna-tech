// Vendor
var bodyParser = require('body-parser');
var dyalnaIdentity = require('node-dyalna-identity');
var requestJson = require('request-json');
var _ = require('lodash');
var Q = require('q');

// Config
var config = require('./config/config');

// Middlewares
var middlewares = {
  bodyParser: bodyParser,
  authentication: new dyalnaIdentity.authentication(),
  security: new dyalnaIdentity.security(requestJson, config.identity.host, config.identity.token),
  authorization: dyalnaIdentity.authorization
};

// Database
var db = require('./models');

// Some helper services
var IdentityAdminClient = require('./helper/identity-admin-client');
var identityAdminClient = new IdentityAdminClient(Q, requestJson, config.identity.host, config.identity.token,
  config.identity.adminUsername, config.identity.adminPassword);

// Controllers
var ProjectController = require('./controller/project-controller');
var controllers = {
  projectController: new ProjectController(_, db, identityAdminClient)
};

module.exports = {
  config: config,
  db: db,
  middlewares: middlewares,
  controllers: controllers
};
