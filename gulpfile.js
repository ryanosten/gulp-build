'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

gulp.task('scripts', ['clean'], function(){
  return gulp.src(['js/global.js', 'js/circle/autogrow.js', 'js/circle/circle.js'])
        .pipe(maps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', ['clean'], function(){
  return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/styles'))
})

gulp.task ('images', ['clean'], function(){
  return gulp.src('images/*.{jpg,png}')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('dist/content'));
})

gulp.task('clean', function(){
  return del('dist');
});

gulp.task('build', ['scripts','styles','images']);

gulp.task('default', ['build']);



//.pipe(maps.init())
//.pipe(maps.write('./'))

//next task, create dist folder
