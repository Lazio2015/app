function AppConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('words', {
            url: '/words',
            templateUrl: 'templates/words/words.html',
            controller: 'WordsCtrl',
            controllerAs: 'words'
        });

    $urlRouterProvider.otherwise('/words');
}