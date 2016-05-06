var db = null;
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])
.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.sqlitePlugin) {
      window.plugins.sqlDB.copy("mydb1.db", function() {
        db = $cordovaSQLite.openDB({name: 'mydb1.db', iosDatabaseLocation: 'default'});
      }, function(error) {
        console.error("There was an error copying the database: " + error);
        db = $cordovaSQLite.openDB({name: 'mydb1.db', iosDatabaseLocation: 'default'});
      });
      //db = $cordovaSQLite.openDB({name: '/android_asset/www/db/mydb1.db', iosDatabaseLocation: 'default'});
      //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
  })
  .state('tab.city', {
    url: '/city',
    views: {
      'tab-city': {
        templateUrl: 'templates/tab-city.html',
        controller: 'CityCtrl'
      }
    }
  })
  .state('tab.city-detail', {
    url: '/city/:id',
    views: {
      'tab-city': {
        templateUrl: 'templates/city-detail.html',
        controller: 'CityDetailCtrl'
      }
    }
  })
  .state('tab.example', {
    url: '/example',
    views: {
      'example': {
        templateUrl: 'templates/example.html',
        controller: 'ExampleCtrl',
        controllerAs: 'exCtrl'
      }
    }
  })
  $urlRouterProvider.otherwise('/tab/city');
});

angular.removeFromObjectArray = function(arr, id) {
  arr = arr.filter(function( obj ) {
    return obj.id !== id;
  });

  return arr;
};
