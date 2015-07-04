class ProjectStarController {
  /* @ngInject */
  constructor($scope, DyalnaIdentity, ProjectRepository) {
    this.loggedin = DyalnaIdentity.isLoggedIn();
    this.ProjectRepository = ProjectRepository;
    this.updateStared();
    $scope.$watchCollection(() => this.userStars, () => this.updateStared());
    $scope.$on('DyalnaIdentity.login', () => {
      this.loggedin = true;
    });

    $scope.$on('DyalnaIdentity.logout', () => {
      this.loggedin = false;
    });
    this.loading = false;
  }

  updateStared() {
    this.isStared = this.userStars.filter(star => star.ProjectId === this.project.id).length !== 0;
  }

  star() {
    this.loading = true;
    this.ProjectRepository.star(this.project).then(star => {
      this.loading = false;
      this.project.countStars++;
      this.userStars.push(star);
    });
  }

  unstar() {
    this.loading = true;
    this.ProjectRepository.unstar(this.project).then(star => {
      this.loading = false;
      this.project.countStars--;
      let index = this.userStars.findIndex(star => star.ProjectId === this.project.id);
      this.userStars.splice(index, 1);
    });
  }
}

/* @ngInject */
export function ProjectStarDirective() {
  return {
    restrict: 'E',
    scope: {
      project: '=project',
      userStars: '=userStars'
    },
    controller: ProjectStarController,
    bindToController: true,
    controllerAs: 'ctrl',
    templateUrl: 'core/project/star.html'
  };
}
