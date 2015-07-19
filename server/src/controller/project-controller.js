module.exports = function(projectRepository, userRepository, mailer, feedGenerator) {

  return {

    feedAction: function(req, res) {
      return projectRepository.findAll()
        .then(projectRepository.serialize.bind(projectRepository))
        .then(function(projects) {
          return feedGenerator.generate(projects);
        })
        .then(function(xml) {
          res.set('Content-Type', 'application/rss+xml');
          return res.send(xml);
        }).catch(function() {
          return res.status(500).send({ status: 'error', message: 'error fetching projects' });
        });
    },

    findAllAction: function(req, res) {
      return projectRepository.findAll(req.query.filters, req.query.page ? req.query.page : 1)
        .then(projectRepository.serialize.bind(projectRepository))
        .then(function(projects) {
          return res.send({ status: 'success', data: projects });
        }).catch(function() {
          return res.status(500).send({ status: 'error', message: 'error fetching projects' });
        });
    },

    findOneAction: function(req, res) {
      return projectRepository.find(req.params.id)
        .then(projectRepository.serializeOne.bind(projectRepository))
        .then(function(project) {
          return res.send({ status: 'success', data: project});
        }).catch(function() {
          return res.status(500).send({ status: 'error', message: 'error fetching project' });
        });
    },

    createAction: function(req, res) {
      projectRepository.create(req.body, req.security.user.username)
        .then(projectRepository.serializeOne.bind(projectRepository))
        .then(function(project) {
          return mailer.sendAdminMail('new-project', 'New Project', { project: project }).then(function() {
            return project;
          });
        })
        .then(function(project) {
          return res.send({ status: 'success', data: project});
        }).catch(function(e) {
          return res.status(500).send({ status: 'error', message: 'database error' });
        });
    },

    addMakerAction: function(req, res) {
      return projectRepository.find(req.params.id)
        .then(function(project) {
          return projectRepository.addMaker(project, req.security.user.username);
        })
        .then(function() {
          return projectRepository.find(req.params.id);
        })
        .then(projectRepository.serializeOne.bind(projectRepository))
        .then(function(project) {
          return mailer.sendAdminMail('new-maker', 'New Maker', { project: project, maker: req.security.user.username }).then(function() {
            return project;
          });
        })
        .then(function(project) {
          return res.send({ status: 'success', data: project});
        }).catch(function() {
          return res.status(500).send({ status: 'error', message: 'error adding maker' });
        });
    },

    makersAction: function(req, res) {
      return projectRepository.find(req.params.id)
        .then(function(project) {
          var makers = project.Makers.filter(function(maker) {
            return maker.approved;
          });
          if (makers.length === 0) {
            return [];
          }

          return userRepository.findAll(makers.map(function(maker) {
            return maker.username;
          }));
        })
        .then(function(users) {
          return res.send({ status: 'success', data: users });
        }).catch(function() {
          return res.status(500).send({ status: 'error', message: 'error fetching makers' });
        });
    }
  };

};
