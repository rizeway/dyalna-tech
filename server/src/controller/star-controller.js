module.exports = function(starRepository, projectRepository, userRepository) {

  return {
    createAction: function(req, res) {
      return projectRepository.find(req.params.slug).then(function(project) {
        return starRepository.create(project.id, req.security.user.username);
      })
      .then(function(star) {
        return res.send({ status: 'success', data: star});
      })
      .catch(function() {
        return res.status(500).send({ status: 'error', message: 'error staring project' });
      });
    },

    removeAction: function(req, res) {
      return projectRepository.find(req.params.slug).then(function(project) {
        return starRepository.remove(project.id, req.security.user.username);
      })
      .then(function(star) {
        return res.send({ status: 'success', data: star});
      })
      .catch(function() {
        return res.status(500).send({ status: 'error', message: 'error unstaring project' });
      });
    },

    myStarsAction: function(req, res) {
      return starRepository.findForUser(req.security.user.username, req.query).then(function(stars) {
        return res.send({ status: 'success', data: stars });
      }, function() {
        return res.status(500).send({ status: 'error', message: 'error fetching stars' });
      });
    },

    projectStarsAction: function(req, res) {
      return projectRepository.find(req.params.slug).then(function(project) {
        return starRepository.findForProject(project.id);
      })
      .then(function(stars) {
        return userRepository.findAll(stars.map(function(star) {
          return star.author;
        }));
      })
      .then(function(users) {
        return res.send({ status: 'success', data: users });
      })
      .catch(function() {
        return res.status(500).send({ status: 'error', message: 'error fetching stars' });
      });
    }

  };

};
