export class ProjectController {
  /* @ngInject */
  constructor($state, project) {
    this.project = project;
    this.absoluteUrl = $state.href('app.project', { id: project.id }, {absolute: true});
  }
}

ProjectController.resolve = {
  project: /* @ngInject */ ($stateParams, ProjectRepository) => ProjectRepository.findOne($stateParams.id)
};
