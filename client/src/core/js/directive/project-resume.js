class ProjectResumeController {
  /* @ngInject */
  constructor($state) {
    this.$state = $state;
  }

  goToProject() {
    this.$state.transitionTo('app.project', { slug: this.project.slug });
  }
}

export /* @ngInject */ function ProjectResumeDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      project: '=project',
      userStars: '=userStars'
    },
    controller: ProjectResumeController,
    bindToController: true,
    controllerAs: 'ctrl',
    templateUrl: 'core/project/resume.html'
  };
}
