module.exports = {
  up: function(db, done) {
    db.addColumn('Projects', 'shortDescription', {
      type: 'text'
    }, done);
  },
  down: function(db, done) {
    db.removeColumn('Projects', 'shortDescription', done);
  }
};
