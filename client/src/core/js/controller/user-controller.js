export class UserController {
  /* @ngInject */
  constructor($scope, $state, user, StarRepository) {
    this.user = user;
    this.myStars = [];
    this.StarRepository = StarRepository;
    this.absoluteUrl = $state.href('app.user', { username: user.username }, {absolute: true});

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
      projects: this.user.founded.map(project => project.id)
        .concat(this.user.likes.map(project => project.id))
    }).then(stars => {
      this.myStars = stars;
    });
  }
}

UserController.resolve = {
  user: /* @ngInject */ ($stateParams, UserRepository) => UserRepository.findOne($stateParams.username)
};
