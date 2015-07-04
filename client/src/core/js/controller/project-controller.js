export class ProjectController {
  /* @ngInject */
  constructor($state, $scope, ProjectRepository, StarRepository, DyalnaIdentity, project) {
    this.StarRepository = StarRepository;
    this.DyalnaIdentity = DyalnaIdentity;
    this.ProjectRepository = ProjectRepository;
    this.project = project;
    this.absoluteUrl = $state.href('app.project', { id: project.id }, {absolute: true});
    this.myStars = [];
    this.makers = [];
    this.isMaker = false;
    $scope.$on('DyalnaIdentity.login', () => {
      this.loadStars();
      this.loadIsMaker();
    });

    $scope.$on('DyalnaIdentity.logout', () => {
      this.myStars = [];
      this.loadIsMaker();
    });

    this.loadStars();
    this.loadMakers();
    this.loadIsMaker();
  }

  loadStars() {
    this.StarRepository.findMyStars({
      projects: [this.project.id]
    }).then(stars => {
      this.myStars = stars;
    });
  }

  loadIsMaker() {
    this.isMaker = this.DyalnaIdentity.isLoggedIn() &&
    !!this.project.makers.find(maker => maker.username === this.DyalnaIdentity.user.username);
  }

  loadMakers() {
    this.ProjectRepository.getMakers(this.project)
      .then(makers => {
        this.makers = makers;
      });
  }

  claimToBeMaker() {
    this.ProjectRepository.addMaker(this.project)
      .then(project => {
        this.project = project;
        this.loadIsMaker();
        this.loadMakers();
      });
  }
}

ProjectController.resolve = {
  project: /* @ngInject */ ($stateParams, ProjectRepository) => ProjectRepository.findOne($stateParams.id)
};
