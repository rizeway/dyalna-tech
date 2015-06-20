module.exports = function(_, db, projectRepository) {

  return {
    findAllAction: function(req, res) {
      return projectRepository.findAll(req.query).then(function(projects) {
        return res.send({ status: 'success', data: projects });
      }).catch(function() {
        return res.status(500).send({ status: 'error', message: 'error fetching projects' });
      });
    },

    findOneAction: function(req, res) {
      return db.Project.find(req.params.id).then(function(project) {
        return res.send({ status: 'success', data: project});
      }, function() {
        return res.status(500).send({ status: 'error', message: 'error fetching project' });
      });
    },

    createAction: function(req, res) {
      db.Project.create(_.extend({}, req.body, { author: req.security.user.username, approved: false })).then(function(project) {
        return res.send({ status: 'success', data: project});
      }, function() {
        return res.status(500).send({ status: 'error', message: 'database error' });
      });
    }
  };

};
