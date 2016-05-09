function RunTime($ionicPlatform, $cordovaSQLite) {
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
        //  window.plugins.sqlDB.copy("mydb1.db", function() {
        //    db = $cordovaSQLite.openDB({name: 'mydb1.db', iosDatabaseLocation: 'default'});
        //  }, function(error) {
        //    console.error("There was an error copying the database: " + error);
        //    db = $cordovaSQLite.openDB({name: 'mydb1.db', iosDatabaseLocation: 'default'});
        //  });
        //}

        //db = window.openDatabase("../db/words.db", "1.0", "My app", -1);
        //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    });
}
