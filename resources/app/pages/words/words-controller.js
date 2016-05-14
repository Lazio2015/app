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

    words.handlers = function (){
        return {

        }
    };

    words.list = [
        {
            text: "Lorem", weight: 13, id: "2",
            filename: 'ffff'
        },
        {text: "Ipsum", weight: 10.5},
        {text: "Dolor", weight: 9.4},
        {text: "Sit", weight: 8},
        {text: "Amet", weight: 6.2},
        {text: "Consectetur", weight: 5},
        {text: "Adipiscing", weight: 5}
    ];
    angular.forEach(words.list, function(item) {
        item.handlers = {
            click: function (e) {
                //play name music
                console.log('e', e);
                //jQuery(e.target).hide();
                console.log(words.list.length);
                if (item.id) {
                    words.list = angular.removeFromObjectArray(words.list, item.id);
                    console.log(words.list.length);
                }
            }
        }
    });

    words.resolve = function() {
        words.loadAllWords();
    };
    words.resolve();
}