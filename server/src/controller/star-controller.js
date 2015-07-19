module.exports = function(starRepository, userRepository) {

  return {
    createAction: function(req, res) {
      return starRepository.create(parseInt(req.params.id), req.security.user.username).then(function(star) {
        return res.send({ status: 'success', data: star});
      }, function() {
        return res.status(500).send({ status: 'error', message: 'error staring project' });
      });
    },

    removeAction: function(req, res) {
      return starRepository.remove(parseInt(req.params.id), req.security.user.username).then(function(star) {
        return res.send({ status: 'success', data: star});
      }, function() {
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
      return starRepository.findForProject(req.params.id)
        .then(function(stars) {
          return userRepository.findAll(stars.map(function(star) {
            return star.author;
          }));
        })
        .then(function(users) {
          return res.send({ status: 'success', data: users });
        }).catch(function() {
          return res.status(500).send({ status: 'error', message: 'error fetching stars' });
        });
    }

  };

};
