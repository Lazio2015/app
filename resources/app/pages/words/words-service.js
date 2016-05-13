function WordsService($http) {

    var WordsService = {};
    WordsService._$http = $http;

    WordsService.list = function(){
        return WordsService._$http.get('/android_asset/www/locations/db.json');
    };

    return WordsService;
}