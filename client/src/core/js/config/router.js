import {ProjectController} from '../controller/project-controller';

export /* @ngInject */ function Router($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('app', {
      templateUrl: 'core/layout.html'
    })
    .state('app.list', {
      url: '/',
      controller: 'ListController as ctrl',
      templateUrl: 'core/pages/front.html',
      security: false
    })
    .state('app.project', {
      url: '/project/:slug',
      controller: 'ProjectController as ctrl',
      templateUrl: 'core/pages/project.html',
      resolve: ProjectController.resolve,
      security: false
    })
    .state('app.register', {
      url: '/register',
      templateUrl: 'core/pages/register.html',
      security: false
    })
    .state('app.login', {
      url: '/login',
      templateUrl: 'core/pages/login.html',
      security: false
    })
    .state('app.unauthorized', {
      url: '/unauthorized',
      templateUrl: 'core/pages/unauthorized.html',
      security: false
    })
    .state('app.confirm', {
      url: '/confirm?token',
      templateUrl: 'core/pages/confirm.html',
      controller: 'UserConfirmController as ctrl',
      security: false
    })
    .state('app.change-password', {
      url: '/user/changePassword',
      templateUrl: 'core/pages/change-password.html',
      security: true
    })
    .state('app.regenerate-password', {
      url: '/regeneratePassword?token',
      templateUrl: 'core/pages/regenerate-password.html',
      controller: 'UserRegeneratePasswordController',
      controllerAs: 'ctrl',
      security: false
    })
    .state('app.lost-password', {
      url: '/lostPassword',
      templateUrl: 'core/pages/lost-password.html',
      security: false
    })
  ;
}
