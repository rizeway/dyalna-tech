module.exports = function(_, crypto, db, identityAdminClient) {

  function md5(str) {
    var hash = crypto.createHash('md5');
    hash.update(str);

    return hash.digest('hex');
  }

  function serializeAuthor(user) {
    return {
      username: user.username,
      hash: md5(user.email.trim().toLowerCase())
    };
  }

  function serializeProject(project, users) {
    var author = _.find(users, { username: project.author });
    project.author = author ? serializeAuthor(author) : null;

    return project;
  }

  function serializeProjects(projects) {
    var authors = projects.map(function(project) {
      return project.author;
    });
    var url = 'user?' + authors.map(function(author) {
        return 'usernames[]=' + author;
      }).join('&');

    return identityAdminClient.get(url).then(function(users) {
      return projects.map(function(project) {
        return serializeProject(project, users);
      });
    });
  }

  return {
    findAll: function(query) {
      return db.Project.findAll({ where: query }).then(serializeProjects);
    }
  };
};
