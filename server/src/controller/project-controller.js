module.exports = function(projectRepository, userRepository, mailer) {

  return {
    findAllAction: function(req, res) {
      return projectRepository.findAll(req.query)
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
          if (project.Makers.length === 0) {
            return [];
          }

          return userRepository.findAll(project.Makers.map(function(maker) {
            return maker.username;
          }));
        })
        .then(function(users) {
          return res.send({ status: 'success', data: users});
        }).catch(function() {
          return res.status(500).send({ status: 'error', message: 'error fetching makers' });
        });
    }
  };

};
