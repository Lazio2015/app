angular.module('starter.controllers', [])
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
      $http.get('./inf.json')
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

    var db = $cordovaSQLite.openDB({name: 'mydb1.db', iosDatabaseLocation: 'default'});

    exCtrl.items = [];
    exCtrl.save = function(item) {
      exCtrl.items.push(item);
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [item.firstname, item.lastname]).then(function(res) {
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
