/* @ngInject */
export class UserConfirmController {
  constructor($stateParams) {
    this.token = $stateParams.token;
  }
}
