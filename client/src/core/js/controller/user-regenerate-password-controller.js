export class UserRegeneratePasswordController {
  /* @ngInject */
  constructor($stateParams) {
    this.token = $stateParams.token;
  }
}
