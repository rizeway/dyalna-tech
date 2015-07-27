export /* @ngInject */ function CookiesConfig($cookiesProvider) {
  // small hack to avoid breaking in local
  if (window.location.href.indexOf('dyalna.com') !== -1) {
    $cookiesProvider.defaults.domain = 'dyalna.com';
  }
}
