export class ProjectController {
  /* @ngInject */
  constructor($state, $scope, ProjectRepository, StarRepository, DyalnaIdentity, growl, project) {
    this.StarRepository = StarRepository;
    this.DyalnaIdentity = DyalnaIdentity;
    this.ProjectRepository = ProjectRepository;
    this.growl = growl;
    this.project = project;
    this.absoluteUrl = $state.href('app.project', { id: project.id }, {absolute: true});
    this.myStars = [];
    this.makers = [];
    this.likers = [];
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
    this.loadLikers();
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
    this.loadingMakers = true;
    this.ProjectRepository.getMakers(this.project)
      .then(makers => {
        this.loadingMakers = false;
        this.makers = makers;
      });
  }

  loadLikers() {
    this.loadingLikers = true;
    this.ProjectRepository.getLikers(this.project)
      .then(likers => {
        this.loadingLikers = false;
        this.likers = likers;
      });
  }

  claimToBeMaker() {
    this.ProjectRepository.addMaker(this.project)
      .then(project => {
        this.project = project;
        this.loadIsMaker();
        this.loadMakers();
        this.growl.addSuccessMessage('Votre demande d\'ajout en tant que fondateur va être prise en compte dans les plus brefs délais.');
      });
  }
}

ProjectController.resolve = {
  project: /* @ngInject */ ($stateParams, ProjectRepository) => ProjectRepository.findOne($stateParams.id)
};
