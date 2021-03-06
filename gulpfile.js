const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('gulp-clean');

function buildLibsJS() {
  console.log('build js');
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/slick-carousel/slick/slick.js',
      'bower_components/wow/dist/wow.js',
      'bower_components/jquery-lazy/jquery.lazy.js',
      'bower_components/fancybox/dist/jquery.fancybox.js'
      ], { allowEmpty: true })
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('src/js'));
};

function buildLibsCss() {
  console.log('build css');
  return gulp.src([
      'bower_components/normalize-css/normalize.css',
      //'bower_components/bootstrap/dist/css/bootstrap-grid.css',
      'bower_components/animate.css/animate.css',
      //'bower_components/slick-carousel/slick/slick.css',
      //'bower_components/slick-carousel/slick/slick-theme.css',
      //'bower_components/fancybox/dist/jquery.fancybox.css'
      ], { allowEmpty: true })
      .pipe(concat('libs.min.css'))
      .pipe(cssnano())
      .pipe(gulp.dest('src/css'));
};

function serve (done) {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch('src/**/*.pug', goPug);
  gulp.watch('src/**/*.sass', goSass);
  gulp.watch('src/js/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);

  done();
}

function goSass () {
  return gulp.src('src/sass/style.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8']))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
}

function goPug () {
  return gulp.src('src/*.pug')
        .pipe(pug( {pretty: true} ))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.stream());
}

function cleanDist () {
  return gulp.src('dist/*', { allowEmpty: true })
         .pipe(del());
}

function buldDist (done) {
  gulp.src([
    'src/css/style.min.css',
    'src/css/libs.min.css'
    ])
  .pipe(gulp.dest('dist/css'))

  gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  gulp.src('src/img/**/*')
  .pipe(gulp.dest('dist/img'))

  gulp.src('src/js/**/*')
  .pipe(gulp.dest('dist/js'))

  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));

  done();
}

exports.go = gulp.series(gulp.parallel(goPug, goSass), serve);
exports.dist = gulp.series(cleanDist, buldDist);
exports.buildLibs = gulp.parallel(buildLibsJS, buildLibsCss);
exports.clean = cleanDist;