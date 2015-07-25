const API_URL = '/tech/star';

export class StarRepository {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  findMyStars(query) {
    return this.$http.get(API_URL + '?' + jQuery.param(query)).then(response => response.data.data);
  }
}
