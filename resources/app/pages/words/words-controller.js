function WordsCtrl($cordovaMedia, $scope, WordsService, $timeout, $ionicHistory) {
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
                words.end = false;
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
        $timeout(function() {
            words.sayCategory(words.currentItem.filename);
        }, 2000);
    };

    words.getWordsByCategoryId = function (i){
        return angular.isUndefinedOrNull(words.allItems[i]) ? null : words.allItems[i];
    };

    words.sayWord = function(item) {
        words.imageStay = 1;
        words.file = item.filename;
        words.sound = document.getElementById("sound");
        var listener = function() {
            //console.log(words.sound.duration);
            words.sound.play();
            $timeout(function() {
                words.imageStay = 0;
                words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
                console.log('kill');
                words.sound.removeEventListener('loadedmetadata', listener);
            }, 1000*words.sound.duration);
        };
        words.sound.addEventListener('loadedmetadata', listener, false);

        //setTimeout(function () {
        //    words.sound.play();
        //    $timeout(function() {
        //        $timeout(function() {
        //            words.imageStay = 0;
        //            //words.sound.pause();
        //            words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
        //            console.log('kill');
        //        }, 1000*words.sound.duration);
        //    },300);
        //}, 150);
    };

    words.sayCategory = function(filename) {
        words.imageStay = 1;
        words.file = filename;
        words.sound = document.getElementById("sound");
        var listener = function() {
            //console.log(words.sound.duration);
            words.sound.play();
            $timeout(function() {
                words.showWords = true;
                words.imageStay = 0;
                console.log('killCat');
                words.sound.removeEventListener('loadedmetadata', listener);
            }, 1000*words.sound.duration);
        };
        words.sound.addEventListener('loadedmetadata', listener, false);
        //setTimeout(function () {
        //    words.sound.play();
        //    $timeout(function() {
        //        $timeout(function() {
        //            words.showWords = true;
        //            words.imageStay = 0;
        //            console.log('killCat');
        //        }, 1000*words.sound.duration);
        //    },500);
        //}, 150);
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
                        words.loadAllWords();
                        //if (confirm('Answer!?')) {
                        //    words.loadAllWords();
                        //    words.end = false;
                        //} else {
                        //    //$ionicHistory.goBack();
                        //    ionic.Platform.exitApp();
                        //    console.log('no');
                        //}
                    }, 3000);

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
    };
    words.resolve();

    //words.sound_on = false;
    //words.sayWord = function(item) {
    //    words.imageStay = 1;
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
    //        words.imageStay = 0;
    //        words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
    //        console.log('kill');
    //    }, 3000);
    //};
    //
    //words.sayCat = function(src) {
    //    words.imageStay = 1;
    //    var url = "/android_asset/www/sound/" + src;
    //    var media = $cordovaMedia.newMedia(url);
    //    media.play();
    //    $timeout(function() {
    //        words.sound_on = false;
    //        media.stop();
    //        media.release();
    //        words.imageStay = 0;
    //        words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
    //        console.log('killCat');
    //    }, 5000);
    //};
}
