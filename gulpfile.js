var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jsonmin = require('gulp-jsonmin');
var ngAnnotate      = require('gulp-ng-annotate');

var paths = {
  index: ['./resources/app/index.html'],
  tpls: {
    pages: ['./resources/app/pages/**/*.html']
  },
  app: ['./resources/app/**/*.js'],
  sass: ['./resources/scss/**/*.scss'],
  img: ['./resources/images/**/*.**'],
  location: ['./resources/location/*.json'],
  sound: ['./resources/sound/**/*.**']
};

var vendors = [
  //"vendors/angular-cookie/angular-cookie.js",
  "vendors/jquery/dist/jquery.js",
  "vendors/ngCordova/dist/ng-cordova.js",
  "vendors/jqcloud2/dist/jqcloud.js",
  "vendors/angular-jqcloud/angular-jqcloud.js"
];

gulp.task('sass', function(done) {
  gulp.src('./resources/scss/ionic.app.scss')
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
});

gulp.task('tpls:index', function() {
  return gulp.src(paths.index)
      .pipe(gulp.dest('./www/'));
});

gulp.task('tpls:pages', function() {
  return gulp.src(paths.tpls.pages)
      .pipe(gulp.dest('./www/templates/'));
});

gulp.task('app', function() {
  return gulp.src(paths.app)
      //.pipe(template({host_url: url}))
      .pipe(concat('main.js'))
      .pipe(ngAnnotate())
      .pipe(gulp.dest('./www/js/'));
});

gulp.task("vendor", function() {
  return gulp.src(vendors)
      .pipe(concat('vendors.js'))
      .pipe(gulp.dest('./www/js/'));
});

gulp.task('img', function() {
  return gulp.src(paths.img)
      .pipe(gulp.dest('./www/img/'));
});

gulp.task('sound', function () {
  gulp.src(paths.sound)
      .pipe(gulp.dest('./www/sound/'));
});

gulp.task('location', function () {
  gulp.src(paths.location)
      .pipe(jsonmin())
      .pipe(gulp.dest('./www/locations/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.index, ['tpls:index']);
  gulp.watch(paths.tpls.pages, ['tpls:pages']);
  gulp.watch(paths.app, ['app']);
});

//gulp.task('install', ['git-check'], function() {
//  return bower.commands.install()
//      .on('log', function(data) {
//        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
//      });
//});
//
//gulp.task('git-check', function(done) {
//  if (!sh.which('git')) {
//    console.log(
//        '  ' + gutil.colors.red('Git is not installed.'),
//        '\n  Git, the version control system, is required to download Ionic.',
//        '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
//        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
//    );
//    process.exit(1);
//  }
//  done();
//});

gulp.task('default', [
  'sass',
  'tpls:index',
  'tpls:pages',
  'vendor',
  'app',
  'img',
  'location',
  'sound'
]);