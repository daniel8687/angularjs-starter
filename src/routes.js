angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'main',
      redirectTo: 'login'
    })
    .state('login', {
      parent: 'app',
      url: 'login',
      component: 'appLogin',
      data: {
        requiredLogin: false
      }
    })
    .state('home', {
      parent: 'app',
      url: 'home/:itemType',
      component: 'appHome',
      data: {
        requiredLogin: true
      }
    });
}
