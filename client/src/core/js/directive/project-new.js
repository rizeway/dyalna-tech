class ProjectNewController {

  /* @ngIneject */
  constructor(ProjectRepository, growl) {
    this.growl = growl;
    this.ProjectRepository = ProjectRepository;
    this.loading = false;
    this.error = false;
    this.project = {};
  }

  create() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.ProjectRepository.create(this.project).then(() => {
      this.loading = false;
      this.growl.addSuccessMessage('Votre projet a été soumis, il sera traité dans les plus brefs délais.');
      this.callback({ project: this.project });
    }, () => {
      this.loading = false;
      this.error = true;
    });
  }

}

export function ProjectNewDirective() {
  return {
    restrict: 'E',
    scope: {
      callback: '&onCreate'
    },
    bindToController: true,
    controller: ProjectNewController,
    controllerAs: 'ctrl',
    templateUrl: 'core/project/new.html'
  };
}
