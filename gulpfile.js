'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    gutil = require('gulp-util'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del');

gulp.task('scripts', function(){
  return gulp.src(['src/js/**/*.js', '!node_modules'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function(){
  return gulp.src('src/sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());
});

gulp.task ('images', function(){
  return gulp.src(['src/images/*', 'src/icons/**/*'], {base: 'src'})
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('dist/content'));
});

gulp.task('clean', function(){
  return del('dist');
});

gulp.task('watchSass', function(){
  gutil.log('watching for sass changes!');
  return gulp.watch('src/sass/*.scss', ['styles']);
});

gulp.task('watchJS', function(){
  gutil.log('watching for js changes!');
  return gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('build', ['clean','scripts','styles','images'], function(){
  return gulp.src(['index.html', 'src/icons'])
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchSass', 'watchJS'], function (){
  return browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('default', ['build'], function(){
  gulp.start('serve');
});
