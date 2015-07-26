const API_URL = '/tech/user';

export class UserRepository {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  findOne(username) {
    return this.$http.get(API_URL + '/' + username).then(response => response.data.data);
  }
}
