export /* @ngInject */ function AuthenticationConfig(DyalnaIdentityConfigProvider) {
  DyalnaIdentityConfigProvider.setConfig({
    host: '/identity',
    loginUrl: '/login',
    logoutUrl: '/logout',
    loggedinUrl: '/me',

    unauthorizedState: 'app.unauthorized',
    targetState: 'app.list',
    loginState: 'app.login',
    tokenName: 'x-dyalna-identity-token',

    domain: 'tech'
  });
}
