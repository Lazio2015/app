angular.module('starter', [
    'ionic',
    'ngCordova',
    'angular-jqcloud'
])

    //config & run
    .config(AppConfig)
    .run(RunTime)

    .controller('AppCtrl', AppCtrl)

    .controller('WordsCtrl', WordsCtrl)
    .factory('WordsService', WordsService);