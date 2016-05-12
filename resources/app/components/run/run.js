function RunTime($ionicPlatform, $cordovaSQLite) {
    var db = null;
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        //if (window.sqlitePlugin) {
        //    console.log('here');
        //    window.plugins.sqlDB.copy("mydb1.db", 0, function () {
        //        console.log('suc');
        //        db = $cordovaSQLite.openDB({name: "mydb1.db", iosDatabaseLocation: "default"});
        //    }, function (error) {
        //        console.log('err');
        //        console.error("There was an error copying the database: " + error);
        //        db = $cordovaSQLite.openDB({name: "mydb1.db", iosDatabaseLocation: "default"});
        //    });
        //}

        //db = $cordovaSQLite.openDB({name: "/assets/mydb1.db", iosDatabaseLocation: "default"});
        //db = window.sqlitePlugin.openDatabase({name: "words.db", iosDatabaseLocation: "default", createFromLocation:1});
        //db = $cordovaSQLite.openDB({name: 'words.db', iosDatabaseLocation: 'default'});
        //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, name text, filename text)");
    });
}
