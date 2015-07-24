const API_URL = '/tech/project';

export class ProjectRepository {
  constructor($http) {
    this.$http = $http;
  }

  findAll(page) {
    return this.$http.get(API_URL + '?page=' + page).then(response => response.data.data);
  }

  findOne(id) {
    return this.$http.get(API_URL + '/' + id).then(response => response.data.data);
  }

  create(project) {
    return this.$http.post(API_URL, project).then(response => response.data.data);
  }

  star(project) {
    return this.$http.post(API_URL + '/' + project.slug + '/star')
      .then(response => response.data.data);
  }

  unstar(project) {
    return this.$http.delete(API_URL + '/' + project.slug + '/star')
      .then(response => response.data.data);
  }

  addMaker(project) {
    return this.$http.post(API_URL + '/' + project.slug + '/maker')
      .then(response => response.data.data);
  }

  getMakers(project) {
    return this.$http.get(API_URL + '/' + project.slug + '/makers')
      .then(response => response.data.data);
  }

  getLikers(project) {
    return this.$http.get(API_URL + '/' + project.slug + '/stars')
      .then(response => response.data.data);
  }
}
