module.exports = {
  up: function(db, done) {
    db.addColumn('Projects', 'slug', {
      type: 'string',
      notNull: true,
      defaultValue: ''
    },function() {
      db.runSql('UPDATE Projects SET slug = id', function() {
        db.changeColumn('Projects', 'slug', {
          type: 'string',
          notNull: true,
          unique: true
        }, done);
      });
    });
  },
  down: function(db, done) {
    db.removeColumn('Projects', 'slug', done);
  }
};
