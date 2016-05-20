function WordsCtrl($cordovaMedia, $scope, WordsService, $timeout, $sce) {
    var words = this;
    words.title = 'Words Ctrl';
    words.allItems = [];
    words.currentItem = {
        list: [],
        filename: ""
    };
    words.counter = 0;
    words.imageStay = false;
    words.disabled = false;
    words.end = false;

    words.loadAllWords = function() {
        WordsService.list()
            .success(function (resp) {
                words.allItems = resp.data;
                words.currentItem = words.getWordsByCategoryId(words.counter);
            })
            .error(function (data, status, headers, config) {
                //$scope.showAlert(status, data);
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    words.getWordsByCategoryId = function (i){
        return angular.isUndefinedOrNull(words.allItems[i]) ? null : words.allItems[i];
    };

    words.sayWord = function(item) {
        words.imageStay = true;
        words.file = item.filename;
        words.sound = document.getElementById("sound");
        setTimeout(function () {
            words.sound.play();
            $timeout(function() {
                words.imageStay = false;
                //words.sound.pause();
                words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
                console.log('kill');
            }, 1000*words.sound.duration);
        }, 150);
    };

    words.sayCategory = function(filename) {
        words.imageStay = true;
        words.file = filename;
        words.sound = document.getElementById("sound");
        setTimeout(function () {
            words.sound.play();
            $timeout(function() {
                words.counter++;
                words.currentItem = words.getWordsByCategoryId(words.counter);
                words.imageStay = false;
                console.log('killCat');
            }, 1000*words.sound.duration);
        }, 150);
    };

    $scope.$watch(function(){
        return words.currentItem.list;
    }, function(){
        $timeout(function() {
            if (words.currentItem.list.length < 1 && !words.end){
                words.sayCategory(words.currentItem.filename);

                if (angular.isUndefinedOrNull(words.currentItem)) {
                    words.currentItem = {
                        list: []
                    };
                    console.log('here');
                    words.end = true;
                }
                //words.addHandlers(words.currentItem.list);
            }
        }, 1000);
    });

    words.resolve = function() {
        words.loadAllWords();
        //words.addHandlers(words.currentItem.list);
    };
    words.resolve();

    //words.sound_on = false;
    //words.play = function(item) {
    //    var url = "/android_asset/www/sound/" + item.filename;
    //    var media = $cordovaMedia.newMedia(url, null, null, mediaStatusCallback);
    //    if (words.sound_on == true) {
    //        media.stop();
    //        media.release();
    //    }
    //    words.sound_on = true;
    //    media.play();
    //
    //    $timeout(function() {
    //        words.sound_on = false;
    //        media.stop();
    //        media.release();
    //        words.imageStay = false;
    //        words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
    //        console.log('kill');
    //    }, 3000);
    //};

    //words.playCat = function(src) {
    //    console.log(src);
    //    var url = "/android_asset/www/sound/" + src;
    //    var media = $cordovaMedia.newMedia(url, null, null, null);
    //    media.play();
    //    $timeout(function() {
    //        media.stop();
    //        media.release();
    //        words.imageStay = false;
    //        console.log('kill');
    //    }, 3000);
    //};
    /*
     words.addHandlers = function(arr) {
     angular.forEach(arr, function(item) {
     item.handlers = {
     click: function () {
     //play name music
     words.imageStay = true;
     //words.play(item.filename);
     //jQuery(e.target).hide();
     console.log(item.id);
     console.log(words.currentItem.list);
     words.currentItem.list = angular.removeFromObjectArray(arr, item.id);
     words.imageStay = false;
     }
     };
     });
     };
     */
}
