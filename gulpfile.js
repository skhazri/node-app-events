
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

gulp.task('default',['watch'], () => {
  gutil.log('task is running');
  //return gulp.src('source/*').pipe(gulp.dest('public/css'))
});
gulp.task('jshint', () => {
  gutil.log('jshint running');
  return gulp.src('app/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-sass', () => {
  return gulp.src('source/css/**/*.scss')
   .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/css'));
});

gulp.task('build-js', ()=> {
  return gulp.src('source/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/js'))
});
// configure which files to watch and what tasks to use on file changes
gulp.task('watch', () => {
  gulp.watch('app/**/*.js',['jshint']);
  gulp.watch('source/css/**/*.scss',['build-sass']);
  gulp.watch('source/js/**/*.js');
});
