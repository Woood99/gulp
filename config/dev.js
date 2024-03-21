const gulp = require('gulp');

const fileInclude = require('gulp-file-include');

const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourceMaps = require('gulp-sourcemaps');

const changed = require('gulp-changed');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');


const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');


const webpack = require('webpack-stream');

const browserSync = require('browser-sync').create();

const settings = require('./settings')

const webpackConfig = require('./webpack.config.js');

const mode = 'development';

// ==============================================================================


gulp.task('html:dev', function () {
    return gulp.src(['./src/html/pages/*.html', './src/html/*.html'])
        .pipe(changed('./app/'), {
            hasChanged: changed.compareContents
        })
        .pipe(plumber(settings.plumberNotify('HTML')))
        .pipe(fileInclude(settings.fileInclude))
        .pipe(gulp.dest('./app/'))
        .pipe(browserSync.stream());
});

gulp.task('sass:dev', function () {
    return gulp.src(['./src/scss/pages/*.scss', './src/scss/*.scss'])
        .pipe(changed('./app/css/'))
        .pipe(plumber(settings.plumberNotify('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
})

gulp.task('js:dev', function () {
    return gulp.src('./src/js/*.js')
        .pipe(changed('./app/js/'))
        .pipe(plumber(settings.plumberNotify('JS')))
        .pipe(webpack(webpackConfig(mode)))
        .pipe(gulp.dest('./app/js'))
        .pipe(browserSync.stream());
})

gulp.task('image:dev', function () {
    return gulp.src('./src/img/**/**.{jpg,jpeg,png,svg}')
        .pipe(changed('./app/img/'))
        .pipe(imagemin([
            imagemin.mozjpeg({
                quality: 80,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 2
            }),
        ]))
        .pipe(gulp.dest('./app/img/'))
        .pipe(gulp.src('./src/img/**/**.{jpg,jpeg,png}'))
        .pipe(webp())
        .pipe(gulp.dest('./app/img/'))
})

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './app'
        },
    });
    gulp.watch(`./src/**/*.html`, gulp.parallel('html:dev'));
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
    gulp.watch('./src/resources/**', gulp.parallel('resources'));
    gulp.watch('./src/img/**/*', gulp.parallel('image:dev'));
    gulp.watch('./src/img/svg/**.svg', gulp.parallel('svg-sprites'));
})