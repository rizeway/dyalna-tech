module.exports = function(_, db, identityAdminClient) {

  return {
    findAllAction: function(req, res) {
      return db.Project.findAll({ where: req.query }).then(function(projects) {
        var authors = projects.map(function(project) {
          return project.author;
        });
        var url = 'user?' + authors.map(function(author) {
            return 'usernames[]=' + author;
          }).join('&');

        return identityAdminClient.get(url).then(function(users) {
          return res.send({ status: 'success', data: projects.map(function(project) {
              project.author = _.find(users, { username: project.author });

              return project;
            })
          });
        });
      }).catch(function() {
        return res.status(500).send({ status: 'error', message: 'error' });
      });
    },

    findOneAction: function(req, res) {
      return db.Project.find(req.params.id).then(function(project) {
        return res.send({ status: 'success', data: project});
      }, function() {
        return res.status(500).send({ status: 'error', message: 'database error' });
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
