module.exports = function(crypto, identityAdminClient) {

  function md5(str) {
    var hash = crypto.createHash('md5');
    hash.update(str);

    return hash.digest('hex');
  }

  function serializeUser(user) {
    return {
      username: user.username,
      hash: md5(user.email.trim().toLowerCase())
    };
  }

  return {
    findAll: function(usernames) {
      var url = 'user?' + usernames.map(function(username) {
          return 'usernames[]=' + username;
        }).join('&');

      return identityAdminClient.get(url).then(function(users) {
        return users.map(function(user) {
          return serializeUser(user);
        });
      });
    },

    find: function(username) {
      var url = 'user?usernames[]=' + username;

      return identityAdminClient.get(url).then(function(users) {
        return serializeUser(users[0]);
      });
    }
  };
};
