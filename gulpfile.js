'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

gulp.task('concatScripts', function(){
  return gulp.src(['js/global.js', 'js/circle/autogrow.js', 'js/circle/circle.js'])
        .pipe(maps.init())
        .pipe(concat('app.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task('scripts', ['concatScripts'], function(){
  return gulp.src('js/app.js')
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function(){
  return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/styles'))
})

gulp.task ('images', function(){
  return gulp.src('images/*.{jpg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'));
})

/*
gulp.task('build', ['minifyScripts'], function(){
  return gulp.src('js/all.min.js')
    .pipe(gulp.dest('dist/scripts'));
});
*/

gulp.task('default', function(){
  gulp.start('build');
});

//.pipe(maps.init())
//.pipe(maps.write('./'))

//next task, create dist folder
