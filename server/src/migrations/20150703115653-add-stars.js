module.exports = {
  up: function(db, done) {
    db.createTable('Stars', {
      id: {
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: 'int'
      },
      staredAt: {
        notNull: true,
        type: 'datetime'
      },
      author: {
        notNull: true,
        type: 'string'
      },
      ProjectId: {
        type: 'int',
        unsigned: true,
        length: 10,
        notNull: true,
        foreignKey: {
          name: 'star_project_id_fk',
          table: 'Projects',
          rules: {
            onDelete: 'CASCADE'
          },
          mapping: 'id'
        }
      }
    }, function() {
      db.addIndex('Stars', 'star_natural_key', ['projectId', 'author'], true, done);
    });
  },
  down: function(db, done) {
    db.dropTable('Stars', done);
  }
};
