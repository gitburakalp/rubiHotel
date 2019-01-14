'use strict';

const config = {
    appHtmlFiles: './app/**/*.html',
    appScssFiles: './app/**/*.scss',
    mainScssFile: './app/scss/main.scss',
    mainCssPath: './app/css/'
}

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync');

function browserSyncFunction(done) {
    browserSync.init({
        server: {
            baseDir: './app',
            routes: {
                'vendor': './node_modules'
            }
        }
    });
    done();
}

function sassFunction() {
    return gulp.src(config.mainScssFile)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('../sources'))
        .pipe(gulp.dest(config.mainCssPath))
        .pipe(browserSync.stream());
}

function htmlFunction() {
    return gulp.src(config.appHtmlFiles)
        .pipe(browserSync.stream());
}

function watchFunction() {
    gulp.watch(config.appScssFiles, sassFunction);
    gulp.watch(config.appHtmlFiles, htmlFunction);
}

gulp.task('sass', sassFunction);
gulp.task('html', htmlFunction);
gulp.task('browserSync', browserSyncFunction);
gulp.task('watch', watchFunction);
gulp.task('default', gulp.series('sass', 'html', 'browserSync', 'watch'));