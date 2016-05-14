function WordsService($http) {

    var WordsService = {};
    WordsService._$http = $http;

    WordsService.list = function(){
        //android_asset/www/
        return WordsService._$http.get('./locations/db.json');
    };

    return WordsService;
}