/* @ngInject */
export class ListController {
    constructor($scope, $state, DyalnaIdentity, ProjectRepository, projects) {
        this.loggedin = DyalnaIdentity.isLoggedIn();
        this.user = DyalnaIdentity.user;
        this.projects = projects;
        this.project = {};
        this.createError = false;
        this.$state = $state;
        this.ProjectRepository = ProjectRepository;

        $scope.$on('DyalnaIdentity.login', () => {
          this.loggedin = true;
          this.user = DyalnaIdentity.user;
        });

        $scope.$on('DyalnaIdentity.logout', () => {
          this.loggedin = false;
          this.user = null;
        });
    }

    create() {
      this.ProjectRepository.create(this.project).then(() => {
        this.$state.reload();
      }, () => {
        this.createError = true;
      });
    }
}

ListController.resolve = {
  /* @ngInject */
  projects: ProjectRepository => ProjectRepository.findAll()
};
