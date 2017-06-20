'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task('concatScripts', function(){
  return gulp.src(['js/global.js', 'js/circle/autogrow.js', 'js/circle/circle.js'])
        .pipe(maps.init())
        .pipe(concat('app.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function(){
  return gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('build', ['minifyScripts'], function(){
  return gulp.src('js/app.min.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function(){
  gulp.start('build');
})

//next task, create dist folder
