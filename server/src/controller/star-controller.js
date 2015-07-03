module.exports = function(starRepository) {

  return {
    createAction: function(req, res) {
      return starRepository.create(req.params.id, req.security.user.username).then(function(star) {
        return res.send({ status: 'success', data: star});
      }, function() {
        return res.status(500).send({ status: 'error', message: 'error staring project' });
      });
    },

    myStarsAction: function(req, res) {
      return starRepository.findForUser(req.security.user.username, req.query).then(function(stars) {
        return res.send({ status: 'success', data: stars });
      }, function() {
        return res.status(500).send({ status: 'error', message: 'error fetching stars' });
      });
    }
  };

};
