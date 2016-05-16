function WordsCtrl($cordovaMedia, $scope, WordsService, $timeout) {
    var words = this;
    words.title = 'Words Ctrl';
    words.allItems = [];
    words.list = [
        {
            text: "Lorem", weight: 13,
            id: 2,
            filename: 'notific.mp3'
        },
        {text: "Ipsum", weight: 10.5,
            id: 3,
            filename: 'notific.mp3'},
        {text: "Dolor", weight: 9.4,
          id: 4,
          filename: 'notific.mp3'},
        {text: "Sit", weight: 8,
          id: 5,
          filename: 'notific.mp3'},
        {text: "Amet", weight: 6.2, id: 6},
        {text: "Consectetur", weight: 15, id:7},
        {text: "Adipiscing", weight: 15, id:1}
    ];
    words.current = 0;
    words.imageStay = false;
    words.disabled = false;

    words.loadAllWords = function() {
        WordsService.list()
            .success(function (resp) {
                words.allItems = resp.data;
                console.log('w', words.list);
            })
            .error(function (data, status, headers, config) {
                $scope.showAlert(status, data);
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    words.getWordsByCategoryId = function (i){
        return words.allItems[i].list;
    };

    words.play = function(src) {
        var url = "/android_asset/www/sound/" + src;
        var media = $cordovaMedia.newMedia(url, function() {
            words.imageStay = false;

            console.log('played');
        });
        $timeout(function() {
            media.play();
        },1000);
        //media.release();

      //$timeout(function () {
      //  words.imageStay = false;
      //}, 5000);
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

    words.addHandlers = function(arr) {
        angular.forEach(arr, function(item) {
            item.handlers = {
                click: function () {
                    //play name music
                    words.imageStay = true;
                    words.play(item.filename);
                    //jQuery(e.target).hide();
                    words.list = angular.removeFromObjectArray(words.list, item.id);
                    words.imageStay = false;
                }
            }
            item.weight = 10;
        });
    };

    $scope.$watch(function(){
        return words.list;
    }, function(){
        if (words.list.length < 1){
            words.list = words.getWordsByCategoryId(words.current);
            words.current++;
            words.addHandlers(words.list);
        }
    });

    words.resolve = function() {
        words.loadAllWords();
        words.addHandlers(words.list);
    };
    words.resolve();
}
