function WordsCtrl($ionicLoading, $cordovaMedia, $scope, WordsService, $timeout) {
    var words = this;
    words.title = 'Words Ctrl';
    words.allItems = [];
    words.current = 0;
    words.imageStay = false;
    words.disabled = false;

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
        var url = "/android_asset/www/sound/" + src;
        var media = $cordovaMedia.newMedia(url, function() {
            words.imageStay = false;
            alert('played');
        });
        media.play();
        media.release();

      $timeout(function () {
        words.imageStay = false;
      }, 5000);
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

    words.list = [
        {
            text: "Lorem", weight: 13,
            id: "2",
            filename: 'notific.mp3'
        },
        {text: "Ipsum", weight: 10.5,
            id: "3",
            filename: 'notific.mp3'},
        {text: "Dolor", weight: 9.4,
          id: "4",
          filename: 'guhesh.mp3'},
        {text: "Sit", weight: 8,
          id: "5",
          filename: 'elvaj.mp3'},
        {text: "Amet", weight: 6.2},
        {text: "Consectetur", weight: 5},
        {text: "Adipiscing", weight: 5}
    ];
    angular.forEach(words.list, function(item) {
        item.handlers = {
            click: function (e) {
                //play name music
                words.imageStay = true;
                words.play(item.filename);
                //jQuery(e.target).hide();
                words.list = angular.removeFromObjectArray(words.list, item.id);
            }
        }
    });

    words.resolve = function() {
        words.loadAllWords();
    };
    words.resolve();
}
