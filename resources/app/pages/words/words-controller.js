function WordsCtrl($cordovaMedia, $scope, WordsService, $timeout, $sce) {
    var words = this;
    words.title = 'Words Ctrl';
    words.allItems = [];
    words.currentItem = {
        list: [],
        filename: ""
    };
    words.path = "/android_asset/www/";
    words.counter = 0;
    words.imageStay = 0;
    words.disabled = false;
    words.end = false;
    //words.loaded = {
    //    words: 'false'
    //};
    words.showWords = false;

    words.loadAllWords = function() {
        WordsService.list()
            .success(function (resp) {
                words.allItems = resp.data;
                words.init();
            })
            .error(function (data, status, headers, config) {
                //$scope.showAlert(status, data);
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    words.init = function() {
        words.counter = 0;
        words.currentItem = words.getWordsByCategoryId(words.counter);
        console.log('words.currentItem', words.currentItem);
        words.sayCategory(words.currentItem.filename);
    };

    words.getWordsByCategoryId = function (i){
        return angular.isUndefinedOrNull(words.allItems[i]) ? null : words.allItems[i];
    };

    words.sayWord = function(item) {
        words.imageStay = 1;
        words.file = item.filename;
        words.sound = document.getElementById("sound");
        setTimeout(function () {
            words.sound.play();
            $timeout(function() {
                words.imageStay = 0;
                //words.sound.pause();
                words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
                console.log('kill');
            }, 1000*words.sound.duration);
        }, 150);
    };

    words.sayCategory = function(filename) {
        words.imageStay = 1;
        words.file = filename;
        words.sound = document.getElementById("sound");
        setTimeout(function () {
            words.sound.play();
            $timeout(function() {
                words.showWords = true;
                words.imageStay = 0;
                console.log('killCat');
            }, 1000*words.sound.duration);
        }, 150);
    };

    $scope.$watch(function(){
        return words.currentItem.list;
    }, function(){
        $timeout(function() {
            if (words.currentItem.list.length < 1 && !words.end){
                words.counter++;
                words.currentItem = words.getWordsByCategoryId(words.counter);
                words.showWords = false;

                if (angular.isUndefinedOrNull(words.currentItem)) {
                    words.currentItem = {
                        list: []
                    };
                    words.end = true;
                    words.imageStay = 2;
                    $timeout(function() {
                        if (confirm('Повторить!?')) {
                            words.init();
                        } else {

                        }
                    }, 2000);

                    //document.getElementById("sound");

                } else {
                    words.sayCategory(words.currentItem.filename);
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
    //    var media = $cordovaMedia.newMedia(url);
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
