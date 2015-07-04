module.exports = function(projectRepository) {

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
        }, function() {
          return res.status(500).send({ status: 'error', message: 'error fetching project' });
        });
    },

    createAction: function(req, res) {
      projectRepository.create(req.body, req.security.user.username)
        .then(projectRepository.serializeOne)
        .then(function(project) {
          return res.send({ status: 'success', data: project});
        }, function(e) {
          console.log(e);
          return res.status(500).send({ status: 'error', message: 'database error' });
        });
    }
  };

};
