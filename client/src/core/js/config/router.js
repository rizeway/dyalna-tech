import {ListController} from '../controller/list-controller';
import {ProjectController} from '../controller/project-controller';

/* @ngInject */
export function Router($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('app', {
      templateUrl: 'core/layout.html'
    })
    .state('app.list', {
      url: '/',
      controller: 'ListController as ctrl',
      templateUrl: 'core/pages/front.html',
      resolve: ListController.resolve,
      security: false
    })
    .state('app.project', {
      url: '/project/:id',
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
  ;
}
