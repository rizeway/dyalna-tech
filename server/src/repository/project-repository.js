module.exports = function(_, Q, db, starRepository, userRepository, slugGenerator) {

  function loadAuthor(project, users) {
    var user = _.find(users, { username: project.author });
    project.author = user ? user : null;

    return project;
  }

  function loadAuthors(projects) {
    if (projects.length === 0) {
      return Q.when(projects);
    }

    var usernames = projects.map(function(project) {
      return project.author;
    });

    return userRepository.findAll(usernames).then(function(users) {
      return projects.map(function(project) {
        return loadAuthor(project, users);
      });
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

  function serializeOne(project) {
    return {
      id: project.id,
      slug: project.slug,
      name: project.name,
      shortDescription: project.shortDescription,
      description: project.description,
      url: project.url,
      author: project.author,
      approved: project.approved,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      makers: project.Makers,
      countStars: project.countStars
    };
  }

  function serialize(projects) {
    return projects.map(serializeOne);
  }

  var projectsByPage = 25;

  return {
    findAll: function(filters, page) {
      if (!page) {
        page = 1;
      }
      if (!filters) {
        filters = {};
      }
      filters.approved = true;

      return db.Project.findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
        where: filters,
        include : [db.Maker],
        limit: projectsByPage,
        offset: (page - 1) * projectsByPage });
    },

    find: function(slug) {
      return db.Project.findOne({ where: { slug: slug }, include : [db.Maker] });
    },

    create: function(projectData, author) {
      var project = {
        name: projectData.name,
        shortDescription: projectData.shortDescription,
        description: projectData.description,
        url: projectData.url,
        author: author,
        approved: false
      };
      var projectCreated = slugGenerator.generate(this, project.name).then(function(slug) {
        project.slug = slug;

        return db.Project.create(project);
      });

      if (projectData.isMaker) {
        projectCreated = projectCreated.then(function(project) {
          return this.addMaker(project, author)
            .then(function() { return project; });
        }.bind(this));
      }

      return projectCreated.then(function(project){
        return starRepository.create(project.id, author)
          .then(function() { return project; });
      });
    },

    addMaker: function(project, username) {
      return project.addMaker(db.Maker.build({
        username: username,
        approved: false
      }));
    },

    checkSlug: function(slug) {
      return db.Project.findAll({
        where: { slug: slug }
      }).then(function(projects) {
        if (projects.length !== 0) {
          return false;
        } else {
          return true;
        }
      });
    },

    serialize: function(projects) {
      return loadStars(projects)
        .then(loadAuthors)
        .then(serialize);
    },

    serializeOne: function(project) {
      return loadStars([project])
        .then(loadAuthors)
        .then(serialize)
        .then(function(projects) {
          return projects[0];
        });
    }
  };
};
