function WordsCtrl($ionicLoading, $cordovaMedia, $scope, WordsService) {
    var words = this;
    words.title = 'Words Ctrl';
    words.allItems = [];
    words.current = 0;

    words.loadAllWords = function() {
        WordsService.list()
            .success(function (resp) {
                words.allItems = resp.data;
                words.items = words.getWordsByCategoryId();
                console.log('data', words.items);
            })
            .error(function (data, status, headers, config) {
                $scope.showAlert(status, data);
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    words.getWordsByCategoryId = function (){
        return words.allItems[0].list;
    };

    words.play = function(src) {
        console.log('click');
        var url = "/android_asset/www/sound/" + src;
        var media = $cordovaMedia.newMedia(url);
        media.play();
        //var media = new Media(src, null, null, mediaStatusCallback);
        //$cordovaMedia.play(media);
        //
        //var mediaStatusCallback = function(status) {
        //    if (status == Media.MEDIA_STARTING) {
        //        $ionicLoading.show({template: "Loading"});
        //    } else {
        //        $ionicLoading.hide();
        //    }
        //};
    };



    words.resolve = function() {
        words.loadAllWords();
    };
    words.resolve();
}