class UserMenuController {
  /* @ngInject */
  constructor($scope, $modal, $location, $state, DyalnaIdentity) {
    this.loggedin = DyalnaIdentity.isLoggedIn();
    this.user     = DyalnaIdentity.user;

    this.$modal = $modal;
    this.DyalnaIdentity = DyalnaIdentity;

    $scope.$on('$stateChangeStart', () => {
      if (this.loginModal) {
        this.loginModal.destroy();
        this.loginModal = false;
      }
    });

    $scope.$on('DyalnaIdentity.login', () => {
      this.loggedin = true;
      this.user = DyalnaIdentity.user;
      if (this.loginModal) {
        this.loginModal.destroy();
        this.loginModal = false;
        $location.path(DyalnaIdentity.targetPage);
      }
    });

    $scope.$on('DyalnaIdentity.logout', () => {
      this.loggedin = false;
      this.user = null;
      if (!DyalnaIdentity.authorize($state.current.security)) {
        $location.path('/');
      }
    });

    DyalnaIdentity.check();
  }

  login() {
    this.loginModal = this.$modal({
      template: 'core/user/login-modal.html',
      show: true
    });
  }

  logout() {
    this.DyalnaIdentity.logout();
  }

}

export function UserMenuDirective() {
  return {
    restrict: 'E',
    controller: UserMenuController,
    controllerAs: 'ctrl',
    templateUrl: 'core/user/user-menu.html'
  };
}
