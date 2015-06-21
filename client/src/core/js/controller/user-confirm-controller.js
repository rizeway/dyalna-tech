export class UserConfirmController {
  /* @ngInject */
  constructor($stateParams) {
    this.token = $stateParams.token;
  }
}
