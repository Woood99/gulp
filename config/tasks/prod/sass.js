import gulpPlumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

import mediaQueries from 'gulp-group-css-media-queries';
import autoPrefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

const sass = gulpSass(dartSass);

export const sassProd = () => {
    return app.gulp.src(['./src/scss/pages/*.scss', './src/scss/*.scss'])
        .pipe(gulpPlumber(app.settings.plumberNotify('SCSS')))
        .pipe(sass())
        .pipe(autoPrefixer({
            cascade: false,
            grid: true,
            overrideBrowserslist: ["last 5 versions"]
        }))
        .pipe(mediaQueries())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(app.gulp.dest('./app/css/'))
}