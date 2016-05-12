function WordsCtrl($http, $scope) {
    var words = this;
    words.title = 'Words Ctrl';
    words.items = [];
    //var db = $cordovaSQLite.openDB({name: "words.db", iosDatabaseLocation: "default"});

    //words.loadItems = function() {
    //    var query = "SELECT * FROM words";
    //    $cordovaSQLite.execute(db, query).then(function(res) {
    //        if(res.rows.length > 0) {
    //            for (var i = 0; i < res.rows.length; i++){
    //                words.items.push(res.rows.item(i));
    //            }
    //            console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
    //            console.log(words.items);
    //        } else {
    //            console.log("No results found");
    //        }
    //    }, function (err) {
    //        console.error(err);
    //    });
    //};
    //
    //words.save = function() {
    //    var query = "INSERT INTO words (name, filename) VALUES (?,?)";
    //    $cordovaSQLite.execute(db, query, [words.model.name, words.model.filename]).then(function(res) {
    //        item.id = res.insertId;
    //        words.items.push(item);
    //        console.log("INSERT ID -> " + res.insertId);
    //    }, function (err) {
    //        console.error(err);
    //    });
    //    words.model = {
    //        name : '',
    //        filename: ''
    //    };
    //};
    //
    //words.resolve = function() {
    //    words.loadItems();
    //};

    words.loadItems = function() {
        $http.get('./../locations/db.json')
            .success(function (data, status, headers, config) {
                $scope.data = data;
                console.log('data', data);
            })
            .error(function (data, status, headers, config) {
                $scope.showAlert(status, data);
                $scope.$broadcast('scroll.refreshComplete');
            });
    }


    words.resolve = function() {
        words.loadItems();
    };
    words.resolve();
}