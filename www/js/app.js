angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'satellizer', 'ngCordova', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

 .config(function($authProvider){
        $authProvider.facebook({
            clientId: '1011194525597680',
            scope: 'email, public_profile, user_photos, user_friends',
            responseType: 'token'
        });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
 
  .state('app.me', {
    url: '/me',
    views: {
      'menuContent': {
        templateUrl: 'templates/me.html',
          controller: 'MeCtrl',
          resolve:{
              aboutMe:function($q, $rootScope, FacebookService){
                  var deffered = $q.defer();
                  
                  FacebookService.me()
                  .success(function(data){
                      $rootScope.userId = data.id;
                      deffered.resolve(data);
                  })
                  .error(function(errorData){
                      deffered.reject(errorData);
                  });
                  
                  return deffered.promise;
              }
          }
      }
    }
  })

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.stores', {
      url: '/stores',
      views: {
        'tab-stores': {
          templateUrl: 'templates/tab-stores.html',
          controller: 'StoresCtrl'
        }
      }
    })

  .state('tab.logs', {
    url: '/logs',
    views: {
      'tab-logs': {
        templateUrl: 'templates/tab-logs.html',
        controller: 'LogsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/search');

});
