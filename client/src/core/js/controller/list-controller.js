export class ListController {
  /* @ngInject */
  constructor($scope, $state, DyalnaIdentity, StarRepository, projects) {
    this.loggedin = DyalnaIdentity.isLoggedIn();
    this.user = DyalnaIdentity.user;
    this.projects = projects;
    this.$state = $state;
    this.StarRepository = StarRepository;
    this.myStars = [];

    $scope.$on('DyalnaIdentity.login', () => {
      this.loggedin = true;
      this.user = DyalnaIdentity.user;
      this.loadStars();
    });

    $scope.$on('DyalnaIdentity.logout', () => {
      this.loggedin = false;
      this.user = null;
      this.myStars = [];
    });

    this.loadStars();
  }

  loadStars() {
    this.StarRepository.findMyStars({
      projects: this.projects.map(project => project.id)
    }).then(stars => {
      this.myStars = stars;
    });
  }

  getUrl(project) {
    return this.$state.href('app.project', { id: project.id }, {absolute: true});
  }

  goToProject(project) {
    this.$state.transitionTo('app.project', { id: project.id });
  }

}

ListController.resolve = {
  projects: /* @ngInject */ ProjectRepository => ProjectRepository.findAll()
};
