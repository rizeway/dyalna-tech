const MAX_PROJECTS_BY_PAGE = 25;

export class ListController {
  /* @ngInject */
  constructor($scope, DyalnaIdentity, StarRepository, ProjectRepository) {
    this.loggedin = DyalnaIdentity.isLoggedIn();
    this.user = DyalnaIdentity.user;
    this.StarRepository = StarRepository;
    this.ProjectRepository = ProjectRepository;
    this.myStars = [];
    this.page = 1;
    this.hasNextPage = true;
    this.pages = {};

    $scope.$on('DyalnaIdentity.login', () => {
      this.loggedin = true;
      this.user = DyalnaIdentity.user;
      this.myStars = [];
      var allProjects = [];
      angular.forEach(this.pages, projects => {
        allProjects = allProjects.concat(projects);
      });
      this.loadStars(allProjects);
    });

    $scope.$on('DyalnaIdentity.logout', () => {
      this.loggedin = false;
      this.user = null;
      this.myStars = [];
    });

    this.loadNextPage();
  }

  loadStars(projects) {
    this.StarRepository.findMyStars({
      projects: projects.map(project => project.id)
    }).then(stars => {
      this.myStars = this.myStars.concat(stars);
    });
  }

  loadNextPage() {
    this.loading = true;
    this.ProjectRepository.findAll(this.page).then(projects => {
      this.pages[this.page] = projects;
      this.hasNextPage = projects.length === MAX_PROJECTS_BY_PAGE;
      this.page++;
      this.loading = false;
      if (this.loggedin) {
        this.loadStars(projects);
      }
    });
  }
}
