module.exports = function(_, db) {

  return {
    create: function(projectId, author) {
      return db.Star.create({
        author: author,
        ProjectId: projectId,
        staredAt: new Date()
      });
    },

    findForUser: function(author, query) {
      var filters = { author: author };
      if (query.projects) {
        filters.ProjectId = { $in: query.projects };
      }
      return db.Star.findAll({ where: filters });
    },
  };
};
