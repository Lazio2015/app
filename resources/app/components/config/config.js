function AppConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('words', {
            url: '/words',
            templateUrl: 'templates/words/words.html',
            controller: 'WordsCtrl',
            controllerAs: 'words'
        })




        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/controllers/tabs.html'
        })
        .state('tab.city', {
            url: '/city',
            views: {
                'tab-city': {
                    templateUrl: 'templates/controllers/tab-city.html',
                    controller: 'CityCtrl'
                }
            }
        })
        .state('tab.city-detail', {
            url: '/city/:id',
            views: {
                'tab-city': {
                    templateUrl: 'templates/controllers/city-detail.html',
                    controller: 'CityDetailCtrl'
                }
            }
        })
        .state('tab.example', {
            url: '/example',
            views: {
                'example': {
                    templateUrl: 'templates/controllers/example.html',
                    controller: 'ExampleCtrl',
                    controllerAs: 'exCtrl'
                }
            }
        })
    $urlRouterProvider.otherwise('/words');
}