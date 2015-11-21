var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var del         = require('del');
var concat      = require('gulp-concat');
var runSequence = require('run-sequence');

var cssDependencies = [
  './bower_components/font-awesome/css/font-awesome.min.css',
  './bower_components/bootstrap/dist/css/bootstrap.min.css',
  './bower_components/toastr/toastr.min.css',
  './node_modules/react-datetime/css/react-datetime.css',
  './node_modules/alertifyjs/build/css/alertify.min.css',
  './node_modules/alertifyjs/build/css/themes/bootstrap.min.css',
  './src/css/styles.css'
];


var fontsDependencies = [
  'bower_components/font-awesome/fonts/**'
];

var AppConfig = {
  appEntry: './src/js/app.js',
  sourceFolder: './src',
  buildFolder: './dist',
  watchifyPaths: ['./node_modules', './src/js'],
};

// Input file.
watchify.args.debug = true;
watchify.args.paths = AppConfig.watchifyPaths
watchify.args.delay = 100;

var bundler = watchify(browserify(AppConfig.appEntry, watchify.args));

// Babel transform
bundler.transform(babelify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  gutil.log('Browserifing js files...');

  return bundler.bundle()
    .on('error', function (err) {
        gutil.log(err.message);
        browserSync.notify("Browserify Error!");
        this.emit("end");
    })
    .pipe(exorcist(AppConfig.buildFolder + '/js/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(AppConfig.buildFolder + '/js'))
    .pipe(browserSync.stream({once: true}));
}

gulp.task('default', function () {
  runSequence('clean', ['templates', 'css', 'fonts', 'img', 'browserify'], function () {
    browserSync.init({
      server: AppConfig.buildFolder,
      open: false
    });
  });
});

gulp.task('templates', function () {
  return gulp.src(AppConfig.sourceFolder + '/**/*.html')
    .pipe(gulp.dest('./dist'))
});

gulp.task('clean', function () {
  gutil.log('Cleaning dist folder...');

  return del(AppConfig.buildFolder);
});

gulp.task('browserify', function () {
  bundle();
});

gulp.task('css', function () {
  gutil.log('Concatenating css dependencies...');

  return gulp.src(cssDependencies)
    .pipe(concat('dependencies.css'))
    .pipe(gulp.dest(AppConfig.buildFolder + '/css'));
});

gulp.task('fonts', function () {
  gutil.log('Copying fonts files...');

  return gulp.src(fontsDependencies)
    .pipe(gulp.dest(AppConfig.buildFolder + '/fonts'));
});

gulp.task('img', function () {
  gutil.log('Copying image folder...');

  return gulp.src(AppConfig.sourceFolder + '/img/**/*')
    .pipe(gulp.dest(AppConfig.buildFolder + '/img'));
});