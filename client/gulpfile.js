var gulp    = require('gulp');
var concat  = require('gulp-concat');
var connect = require('gulp-connect');
var less    = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');

var config = require('./config/config');

var PATH = {
  INDEX: './src/index.html',
  JS: './src/**/*.js',
  JS_ENTRY: './src/core/js/app.js',
  LESS: './src/core/less/main.less',
  LESS_FILES: './src/**/*.less',
  TEMPLATES: './src/*/**/*.html',
  VENDORS: [
    './node_modules/babel-core/browser-polyfill.min.js',
    './bower_components/jquery/dist/jquery.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './bower_components/angular-strap/dist/angular-strap.js',
    './bower_components/angular-strap/dist/angular-strap.tpl.js',
    './bower_components/angular-animate/angular-animate.js',
    './bower_components/angular-cookies/angular-cookies.js',
    './bower_components/bootstrap-markdown/js/bootstrap-markdown.js',
    './bower_components/bootstrap-markdown/locale/bootstrap-markdown.fr.js',
    './bower_components/marked/lib/marked.js',
    './bower_components/angular-marked/angular-marked.js',
    './bower_components/angular-gravatar/build/angular-gravatar.js',
    './bower_components/angular-easyfb/angular-easyfb.js',
    './bower_components/angular-growl/build/angular-growl.js',
    './bower_components/angular-loading-bar/build/loading-bar.js',
    './bower_components/angulartics/dist/angulartics.min.js',
    './bower_components/angulartics/dist/angulartics-ga.min.js'
  ],
  VENDORS_CSS: [
    './bower_components/angular-motion/dist/angular-motion.css',
    './bower_components/bootstrap-markdown/css/bootstrap-markdown.css',
    './bower_components/angular-growl/build/angular-growl.min.css',
    './bower_components/angular-loading-bar/build/loading-bar.css'
  ],
  FONTS: [
    './bower_components/fontawesome/fonts/*'
  ],
  IMAGES: [
    './bower_components/dyalna-ui/images/**'
  ],
  WEBCONTENT: [
    './src/favicon.ico'
  ],

  APP: 'app.js',
  VENDOR: 'vendor.js',
  VENDOR_CSS: 'vendor.css',

  OUTPUT: './public',
  OUTPUTJS: './public/js',
  OUTPUTCSS: './public/css',
  OUTPUTFONT: './public/fonts',
  OUTPUTIMAGES: './public/images',
};

gulp.task('clean', function(done){
  del(PATH.OUTPUT, done);
});

gulp.task('build/index', function() {
  gulp.src(PATH.INDEX)
    .pipe(gulp.dest(PATH.OUTPUT));
});

gulp.task('build/webcontent', function() {
  gulp.src(PATH.WEBCONTENT)
    .pipe(gulp.dest(PATH.OUTPUT));
});

gulp.task('build/app', function() {
  return browserify(PATH.JS_ENTRY,  { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(PATH.APP))
    .pipe(gulp.dest(PATH.OUTPUTJS));
});

gulp.task('build/vendor', function() {
  gulp.src(PATH.VENDORS)
    .pipe(concat(PATH.VENDOR))
    .pipe(gulp.dest(PATH.OUTPUTJS));
});

gulp.task('build/vendor/css', function() {
  gulp.src(PATH.VENDORS_CSS)
    .pipe(concat(PATH.VENDOR_CSS))
    .pipe(gulp.dest(PATH.OUTPUTCSS));
});

gulp.task('build/less', function () {
  gulp.src(PATH.LESS)
    .pipe(less())
    .pipe(gulp.dest(PATH.OUTPUTCSS));
});

gulp.task('build/templates', function () {
  gulp.src(PATH.TEMPLATES)
    .pipe(rename(function(filepath) {
      filepath.dirname = filepath.dirname.replace('/templates', '');
    }))
    .pipe(templateCache({module: 'dyalna-tech.templates'}))
    .pipe(gulp.dest(PATH.OUTPUTJS));
});

gulp.task('build/fonts', function() {
  gulp.src(PATH.FONTS)
    .pipe(flatten())
    .pipe(gulp.dest(PATH.OUTPUTFONT));
});

gulp.task('build/images', function() {
  gulp.src(PATH.IMAGES)
    .pipe(gulp.dest(PATH.OUTPUTIMAGES));
});

gulp.task('build', ['build/index', 'build/webcontent', 'build/app', 'build/less', 'build/vendor', 'build/vendor/css', 'build/templates', 'build/fonts', 'build/images']);

// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch(PATH.JS, ['build/app']);
  gulp.watch(PATH.INDEX, ['build/index']);
  gulp.watch(PATH.LESS_FILES, ['build/less']);
  gulp.watch(PATH.VENDORS, ['build/vendor']);
  gulp.watch(PATH.VENDORS_CSS, ['build/vendor/css']);
  gulp.watch(PATH.TEMPLATES, ['build/templates']);
  gulp.watch(PATH.FONTS, ['build/fonts']);
  gulp.watch(PATH.IMAGES, ['build/images']);
  gulp.watch('gulpfile.js', ['build']);
});

// WEB SERVER
gulp.task('serve', function() {
  connect.server({
    root: [PATH.OUTPUT],
    port: 8000,
    livereload: false,
    middleware: function() {
      return [
        (function() {
          var url = require('url');
          var proxy = require('proxy-middleware');
          var options = url.parse(config.identity);
          options.route = '/identity';
          return proxy(options);
        })(),

        (function() {
          var url = require('url');
          var proxy = require('proxy-middleware');
          var options = url.parse(config.tech);
          options.route = '/tech';
          return proxy(options);
        })()
      ];
    }
  });
});

gulp.task('default', ['serve', 'watch']);
