import {DyalnaIdentityModule} from '../../../bower_components/angular-dyalna-identity/src/js/module';

import {Router} from './config/router';
import {AuthenticationConfig} from './config/authentication';
import {GravatarConfig} from './config/gravatar';
import {FacebookConfig} from './config/facebook';
import {GrowlConfig} from './config/growl';

import {ListController} from './controller/list-controller';
import {ProjectController} from './controller/project-controller';
import {UserController} from './controller/user-controller';
import {UserConfirmController} from './controller/user-confirm-controller';
import {UserRegeneratePasswordController} from './controller/user-regenerate-password-controller';

import {UserMenuDirective} from './directive/user-menu';
import {MarkdownEditorDirective} from './directive/markdown-editor';
import {ProjectStarDirective} from './directive/project-star';
import {ProjectNewDirective} from './directive/project-new';
import {ProjectResumeDirective} from './directive/project-resume';

import {ProjectRepository} from './service/project-repository';
import {StarRepository} from './service/star-repository';
import {UserRepository} from './service/user-repository';

angular.module('dyalna-tech.templates', []);
angular
  .module('dyalna-tech', [
    'dyalna-tech.templates',
    'ngAnimate',
    'ui.router',
    'mgcrea.ngStrap',
    'hc.marked',
    'ui.gravatar',
    'ezfb',
    'angular-growl',
    'angular-loading-bar',
    'angulartics', 'angulartics.google.analytics',
    'ngSocial',
    DyalnaIdentityModule
  ])
  .config(Router)
  .config(AuthenticationConfig)
  .config(GravatarConfig)
  .config(FacebookConfig)
  .config(GrowlConfig)
  .controller('ListController', ListController)
  .controller('ProjectController', ProjectController)
  .controller('UserController', UserController)
  .controller('UserConfirmController', UserConfirmController)
  .controller('UserRegeneratePasswordController', UserRegeneratePasswordController)
  .directive('userMenu', UserMenuDirective)
  .directive('markdownEditor', MarkdownEditorDirective)
  .directive('projectStar', ProjectStarDirective)
  .directive('projectResume', ProjectResumeDirective)
  .directive('projectNew', ProjectNewDirective)
  .service('ProjectRepository', ProjectRepository)
  .service('StarRepository', StarRepository)
  .service('UserRepository', UserRepository)
;

