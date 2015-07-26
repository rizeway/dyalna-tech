module.exports = function(userRepository, projectRepository, starRepository) {

  return {

    findOneAction: function(req, res) {
      return userRepository.find(req.params.username)
        .then(function(user) {
          return projectRepository.findForMaker(user.username)
            .then(projectRepository.serialize.bind(projectRepository))
            .then(function(projects) {
              user.founded = projects;

              return user;
            });
        })
        .then(function(user) {
          return projectRepository.findForLiker(user.username, {})
            .then(projectRepository.serialize.bind(projectRepository))
            .then(function(projects) {
              user.likes = projects;

              return user;
            });
        })
        .then(function(user) {
          return res.send({ status: 'success', data: user });
        }).catch(function() {
          return res.status(500).send({ status: 'error', message: 'error fetching user' });
        });
    }
  };

};
