export /* @ngInject */ function GrowlConfig(growlProvider) {
  growlProvider.globalTimeToLive(5000);
}
