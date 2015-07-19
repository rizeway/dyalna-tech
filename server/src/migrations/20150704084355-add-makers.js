module.exports = {
  up: function(db, done) {
    db.createTable('Makers', {
      id: {
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: 'int'
      },
      username: {
        notNull: true,
        type: 'string'
      },
      ProjectId: {
        type: 'int',
        unsigned: true,
        length: 10,
        notNull: true,
        foreignKey: {
          name: 'maker_project_id_fk',
          table: 'Projects',
          rules: {
            onDelete: 'CASCADE'
          },
          mapping: 'id'
        }
      },
      approved: {
        notNull: true,
        type: 'boolean',
        defaultValue: false
      },
      createdAt: {
        notNull: true,
        type: 'datetime'
      },
      updatedAt: {
        notNull: true,
        type: 'datetime'
      }
    }, function() {
      db.addIndex('Makers', 'maker_natural_key', ['ProjectId', 'username'], true, done);
    });
  },
  down: function(db, done) {
    db.dropTable('Makers', done);
  }
};
