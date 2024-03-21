const gulp = require('gulp');

const clean = require('gulp-clean');
const fs = require('fs');

const replace = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');

gulp.task('clean', function (done) {
    if (fs.existsSync('./app/')) {
        return gulp.src('./app/', {
                read: false
            })
            .pipe(clean());
    }
    done();
})

gulp.task('resources', function () {
    return gulp.src('./src/resources/**')
        .pipe(gulp.dest('./app'))
})

gulp.task('svg-sprites', function () {
    return gulp.src('./src/img/svg/**.svg')
        .pipe(
            svgmin({
                js2svg: {
                    pretty: true,
                },
            })
        )
        .pipe(
            cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {
                    xmlMode: true
                },
            })
        )
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            },
        }))
        .pipe(gulp.dest('./app/img/'));
})