module.exports = function(_, crypto, Q, db, identityAdminClient) {

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

  function loadAuthor(project, users) {
    var author = _.find(users, { username: project.author });
    project.author = author ? serializeAuthor(author) : null;

    return project;
  }

  function loadAuthors(projects) {
    if (projects.length === 0) {
      return Q.when(projects);
    }

    var authors = projects.map(function(project) {
      return project.author;
    });
    var url = 'user?' + authors.map(function(author) {
        return 'usernames[]=' + author;
      }).join('&');

    return identityAdminClient.get(url).then(function(users) {
      return projects.map(function(project) {
        return loadAuthor(project, users);
      });
    });
  }

  function loadOneAuthor(project) {
    return loadAuthors([project]).then(function(projects) {
      return projects[0];
    });
  }

  function loadStars(projects) {
    if (projects.length === 0) {
      return Q.when(projects);
    }

    return db.sequelize.query('SELECT ProjectId AS pid, count(Id) AS countStars FROM Stars WHERE ProjectId IN (:projects) GROUP BY ProjectId', {
      replacements: {
        projects: projects.map(function(project) { return project.id; })
      },
      type: db.sequelize.QueryTypes.SELECT
    }).then(function(stars) {
      return projects.map(function(project) {
        var star = _.find(stars, { pid: project.id });
        project.countStars = star ? star.countStars : 0;

        return project;
      });
    });
  }

  function loadOneStars(project) {
    return loadStars([project]).then(function(projects) {
      return projects[0];
    });
  }

  function serializeOne(project) {
    return {
      id: project.id,
      name: project.name,
      shortDescription: project.shortDescription,
      description: project.description,
      url: project.url,
      author: project.author,
      approved: project.approved,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      countStars: project.countStars
    };
  }

  function serialize(projects) {
    return projects.map(serializeOne);
  }

  return {
    findAll: function(query) {
      return db.Project.findAll({ where: query })
        .then(loadStars)
        .then(loadAuthors)
        .then(serialize);
    },

    find: function(id) {
      return db.Project.findById(id)
        .then(loadOneStars)
        .then(loadOneAuthor)
        .then(serializeOne);
    },

    create: function(projectData, author) {
      return db.Project.create(_.extend({}, projectData, { author: author, approved: false }))
        .then(loadOneStars)
        .then(loadOneAuthor)
        .then(serializeOne);
    }
  };
};
