import gulpPlumber from 'gulp-plumber';
import mapSources from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import gulpChangedInPlace from 'gulp-changed-in-place';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export const sassDev = () => {
    return app.gulp.src(['./src/scss/pages/*.scss', './src/scss/*.scss'])
    .pipe(gulpPlumber(app.settings.plumberNotify('SCSS')))
    .pipe(mapSources.init())
    .pipe(sass())
    .pipe(mapSources.write())
    .pipe(app.gulp.dest('./app/css/'))
    .pipe(gulpChangedInPlace())
    .pipe(browserSync.stream());
}