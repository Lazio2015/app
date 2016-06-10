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
            console.log('wordDur', words.sound.duration);
            words.sound.play();
            $timeout(function() {
                words.imageStay = 0;
                words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
                console.log('kill');
                words.sound.removeEventListener('loadedmetadata', listener);
            }, 1000*words.sound.duration);
        };
        words.sound.addEventListener('loadedmetadata', listener, false);
    };

    words.sayCategory = function(filename) {
        words.imageStay = 1;
        words.file = filename;
        words.sound = document.getElementById("sound");
        var listener = function() {
            console.log('sayDur',words.sound.duration);
            words.sound.play();
            $timeout(function() {
                words.showWords = true;
                words.imageStay = 0;
                console.log('killCat');
                words.sound.removeEventListener('loadedmetadata', listener);
            }, 1000*words.sound.duration);
        };
        words.sound.addEventListener('loadedmetadata', listener, false);
    };

    words.playFinish = function() {
        words.end = true;
        words.imageStay = 2;
        words.music = document.getElementById("finish");
        words.music.play();
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
        }, 4800);
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
                    words.playFinish();
                } else {
                    words.sayCategory(words.currentItem.filename);
                }
            }
        }, 1000);
    });

    words.resolve = function() {
        words.loadAllWords();
    };
    words.resolve();

    //
    //words.sound_on = false;
    //words.sayWord = function(item) {
    //    words.imageStay = 1;
    //    var url = "/android_asset/www/" + item.filename;
    //    var media = $cordovaMedia.newMedia(url);
    //    if (words.sound_on == true) {
    //        media.stop();
    //        media.release();
    //        return;
    //    }
    //    words.sound_on = true;
    //    media.play();
    //
    //    $timeout(function() {
    //        words.imageStay = 0;
    //        words.sound_on = false;
    //        media.stop();
    //        media.release();
    //        words.currentItem.list = angular.removeFromObjectArray(words.currentItem.list, item.id);
    //        console.log('kill');
    //    }, 1000*item.duration);
    //};
    //
    //words.sayCategory = function(src, duration) {
    //    words.imageStay = 1;
    //    var url = "/android_asset/www/" + src;
    //    var media = $cordovaMedia.newMedia(url);
    //    if (words.sound_on == true) {
    //        media.stop();
    //        media.release();
    //        return;
    //    }
    //    words.sound_on = true;
    //    media.play();
    //    $timeout(function() {
    //        words.imageStay = 0;
    //        words.sound_on = false;
    //        media.stop();
    //        media.release();
    //        words.showWords = true;
    //        console.log('killCat');
    //    }, 1000*duration);
    //};
}
