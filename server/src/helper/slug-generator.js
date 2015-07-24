module.exports = function(slug) {
  return {
    generate: function(repository, caption, i) {
      var slugified = slug(caption) + (i ? '-' + i : '');
      var generator = this;
      return repository.checkSlug(slugified).then(function(valid) {
        if (valid) {
          return slugified;
        } else {
          return generator.generate(repository, caption, i ? 1 + i : 1);
        }
      });
    }
  };
};
