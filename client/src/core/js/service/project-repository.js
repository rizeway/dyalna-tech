const API_URL = '/tech/project';

export class ProjectRepository {
  constructor($http) {
    this.$http = $http;
  }

  findAll() {
    return this.$http.get(API_URL).then(response => response.data.data);
  }

  findOne(id) {
    return this.$http.get(API_URL + '/' + id).then(response => response.data.data);
  }

  create(project) {
    return this.$http.post(API_URL, project).then(response => response.data.data);
  }
}
