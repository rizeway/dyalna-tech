import {DyalnaIdentityModule} from '../../../bower_components/angular-dyalna-identity/src/js/module';
import {Router} from './config/router';
import {AuthenticationConfig} from './config/authentication';
import {GravatarConfig} from './config/gravatar';
import {ListController} from './controller/list-controller';
import {UserConfirmController} from './controller/user-confirm-controller';
import {UserMenuDirective} from './directive/user-menu';
import {MarkdownEditorDirective} from './directive/markdown-editor';
import {ProjectRepository} from './service/project-repository';

angular.module('dyalna-tech.templates', []);
angular
  .module('dyalna-tech', [
    'dyalna-tech.templates',
    'ngAnimate',
    'ui.router',
    'mgcrea.ngStrap',
    'hc.marked',
    'ui.gravatar',
    DyalnaIdentityModule
  ])
  .config(Router)
  .config(AuthenticationConfig)
  .config(GravatarConfig)
  .controller('ListController', ListController)
  .controller('UserConfirmController', UserConfirmController)
  .directive('userMenu', UserMenuDirective)
  .directive('markdownEditor', MarkdownEditorDirective)
  .service('ProjectRepository', ProjectRepository)
;
