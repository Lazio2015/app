var db = null;
angular.module('starter', [
    'ionic',
    'ngCordova'
])

//config & run
    .config(AppConfig)
    .run(RunTime)

    .controller('AppCtrl', AppCtrl)

    .controller('WordsCtrl', WordsCtrl)
    .factory('WordsService', WordsService)

    .factory('Cities', function() {
        var cities = [{
            id: 524901,
            name: 'Москва',
            desc: 'Столица нашей Родины',
            emblem: 'http://upload.wikimedia.org/wikipedia/commons/d/da/Coat_of_Arms_of_Moscow.png'
        }];
        return {
            all: function() {
                return cities;
            },
            get: function(id) {
                for (var i = 0; i < cities.length; i++) {
                    if (cities[i].id === parseInt(id)) {
                        return cities[i];
                    }
                }
                return null;
            }
        };
    })

.controller('CityCtrl', function($scope, Cities) {
    $scope.cities = Cities.all();

    $scope.click = function() {
        $scope.orientationSound = document.getElementById("orientationSound");
        $scope.orientationSound.play();
        $scope.orientationSound.play();
    };
})
    .controller('CityDetailCtrl', function($scope, $http, $stateParams, $ionicPopup) {
        $scope.data = {};
        $scope.id = $stateParams.id;
        $scope.showAlert = function(title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        };
        $scope.refresh = function() {
            $http.get('./../locations/inf.json')
                .success(function(data, status, headers, config){
                    $scope.data = data;
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .error(function(data, status, headers, config){
                    $scope.showAlert(status, data);
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.refresh();
    })


    .controller('ExampleCtrl', function($scope, $cordovaSQLite) {
        var exCtrl = this;
        exCtrl.model = {
            lastname : '',
            firstname: ''
        };

        //var db = $cordovaSQLite.openDB({name: 'mydb1.db', iosDatabaseLocation: 'default'});
        var db = window.openDatabase('mydb1.db', "1.0", "My app", -1);

        exCtrl.items = [];
        exCtrl.save = function(item) {
            var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
            $cordovaSQLite.execute(db, query, [item.firstname, item.lastname]).then(function(res) {
                item.id = res.insertId;
                exCtrl.items.push(item);
                console.log("INSERT ID -> " + res.insertId);
            }, function (err) {
                console.error(err);
            });
            exCtrl.model = {
                lastname : '',
                firstname: ''
            };
        };

        exCtrl.loadItems = function(lastname) {
            console.debug('here');
            var query = "SELECT * FROM people";
            $cordovaSQLite.execute(db, query).then(function(res) {
                if(res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++){
                        exCtrl.items.push(res.rows.item(i));
                    }
                    console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
                    console.log(exCtrl.items);
                } else {
                    console.log("No results found");
                }
            }, function (err) {
                console.error(err);
            });
        };

        exCtrl.remove = function(id) {
            var query = "DELETE FROM people WHERE id = ?";
            $cordovaSQLite.execute(db, query, [id]).then(function(res) {
                exCtrl.items = angular.removeFromObjectArray(exCtrl.items, id);
                console.log("DELETE ID -> " + id);
            }, function (err) {
                console.error(err);
            });
        };

        exCtrl.resolve = function() {
            exCtrl.loadItems();
        };

        exCtrl.resolve();
    });