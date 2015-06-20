module.exports = function(Q, requestJson, identityHost, securityHeaderName, adminUsername, adminPassword) {

  var login = function() {
    var deferred = Q.defer();
    var client = requestJson.newClient(identityHost);
    client.post('login', {
      username: adminUsername,
      password: adminPassword
    }, function (err, res, data) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(data.token);
      }
    });

    return deferred.promise;
  };

  return {
    post: function(url, data) {
      return login()
        .then(function(token) {
          var deferred = Q.defer(),
            headers = {};
          headers[securityHeaderName] = token;
          var client = requestJson.newClient(identityHost, { headers: headers });
          client.post(url, data, function (err, res, data) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(data);
            }
          });

          deferred.promise.then(function() {
            client.get('logout', function(){});
          });

          return deferred.promise;
        });
    },

    get: function(url) {
      return login()
        .then(function(token) {
          var deferred = Q.defer(),
            headers = {};
          headers[securityHeaderName] = token;
          var client = requestJson.newClient(identityHost, { headers: headers });
          client.get(url, function (err, res, data) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(data.data);
            }
          });

          deferred.promise.then(function() {
            client.get('logout', function(){});
          });

          return deferred.promise;
        });
    }
  };
};
