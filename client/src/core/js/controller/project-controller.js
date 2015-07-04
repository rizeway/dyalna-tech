export class ProjectController {
  /* @ngInject */
  constructor($state, $scope, StarRepository, project) {
    this.StarRepository = StarRepository;
    this.project = project;
    this.absoluteUrl = $state.href('app.project', { id: project.id }, {absolute: true});
    this.myStars = [];
    $scope.$on('DyalnaIdentity.login', () => {
      this.loadStars();
    });

    $scope.$on('DyalnaIdentity.logout', () => {
      this.myStars = [];
    });

    this.loadStars();
  }

  loadStars() {
    this.StarRepository.findMyStars({
      projects: [this.project.id]
    }).then(stars => {
      this.myStars = stars;
    });
  }
}

ProjectController.resolve = {
  project: /* @ngInject */ ($stateParams, ProjectRepository) => ProjectRepository.findOne($stateParams.id)
};
