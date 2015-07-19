var path = require('path');

// Vendor
var crypto = require('crypto');
var bodyParser = require('body-parser');
var dyalnaIdentity = require('node-dyalna-identity');
var requestJson = require('request-json');
var _ = require('lodash');
var Q = require('q');
var emailTemplates = require('email-templates');
var nodemailer = require('nodemailer');
var RSS = require('rss');

// Config
var config = require('./config/config');
var templatesDirectory = path.resolve(__dirname, 'templates');

// Middlewares
var middlewares = {
  bodyParser: bodyParser,
  authentication: new dyalnaIdentity.authentication(),
  security: new dyalnaIdentity.security(requestJson, config.identity.host, config.identity.token),
  authorization: dyalnaIdentity.authorization
};

// Database
var db = require('./models');

// Mailer
var Mailer = require('./mailer/mailer');
var mailer = new Mailer(Q, nodemailer, emailTemplates, config.mailer, templatesDirectory);

// Some helper services
var IdentityAdminClient = require('./helper/identity-admin-client');
var identityAdminClient = new IdentityAdminClient(Q, requestJson, config.identity.host, config.identity.token,
  config.identity.adminUsername, config.identity.adminPassword);

// Feed
var FeedGenerator = require('./feed/generator');
var feedGenerator = new FeedGenerator(RSS, config.feed);

// Repositories
var UserRepository = require('./repository/user-repository');
var userRepository = new UserRepository(crypto, identityAdminClient);
var StarRepository = require('./repository/star-repository');
var starRepository = new StarRepository(db);
var ProjectRepository = require('./repository/project-repository');
var projectRepository = new ProjectRepository(_, Q, db, starRepository, userRepository);

// Controllers
var ProjectController = require('./controller/project-controller');
var StarController = require('./controller/star-controller');
var controllers = {
  projectController: new ProjectController(projectRepository, userRepository, mailer, feedGenerator),
  starController: new StarController(starRepository, userRepository)
};

module.exports = {
  config: config,
  db: db,
  middlewares: middlewares,
  controllers: controllers
};
