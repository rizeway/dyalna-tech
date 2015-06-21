export class ProjectController {
  /* @ngInject */
  constructor(project) {
    this.project = project;
  }
}

ProjectController.resolve = {
  project: /* @ngInject */ ($stateParams, ProjectRepository) => ProjectRepository.findOne($stateParams.id)
};
