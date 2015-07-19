module.exports = function(RSS, feedConfig) {
  return {
    generate: function(projects) {
      var d = new Date();
      var feed = new RSS({
        title: feedConfig.title,
        description: feedConfig.description,
        feed_url: feedConfig.feedUrl,
        site_url: feedConfig.siteUrl,
        image_url: feedConfig.imageUrl,
        managingEditor: feedConfig.author,
        webMaster: feedConfig.author,
        copyright: d.getYear() + ' '+ feedConfig.imageUrl,
        language: 'fr',
        categories: feedConfig.categories,
        pubDate: d.toString(),
        ttl: feedConfig.ttl
      });

      projects.forEach(function(project) {
        feed.item({
          title:  project.name,
          description: project.shortDescription,
          url: feedConfig.projectUrl.split('{id}').join(project.id), // link to the item
          author: project.author.username, // optional - defaults to feed author property
          date: project.createdAt, // any format that js Date can parse.
        });
      });

      return feed.xml();
    }
  };
};
