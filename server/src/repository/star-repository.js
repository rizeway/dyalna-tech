module.exports = function(db) {

  return {
    create: function(projectId, author) {
      return db.Star.create({
        author: author,
        ProjectId: projectId,
        staredAt: new Date()
      });
    },

    remove: function(projectId, author) {
      return db.Star.findOne({ where: {
        author: author,
        ProjectId: projectId
      }}).then(function(star) {
        return star.destroy();
      });
    },

    findForUser: function(author, query) {
      var filters = { author: author };
      if (query.projects) {
        filters.ProjectId = { $in: query.projects };
      }
      return db.Star.findAll({ where: filters });
    },

    findForProject: function(projectId) {
      var filters = { ProjectId: projectId };
      return db.Star.findAll({ where: filters });
    },
  };
};
