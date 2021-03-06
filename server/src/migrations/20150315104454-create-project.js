module.exports = {
  up: function(db, done) {
    db.createTable('Projects', {
      id: {
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: 'int'
      },
      name: {
        type: 'string'
      },
      description: {
        type: 'text'
      },
      url: {
        type: 'string'
      },
      author: {
        type: 'string'
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
    }, done);
  },
  down: function(db, done) {
    db.dropTable('Projects', done);
  }
};
