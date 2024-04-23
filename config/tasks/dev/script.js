import gulpPlumber from 'gulp-plumber';
import gulpChangedInPlace from 'gulp-changed-in-place';
import webpackConfig from '../../webpack.config.js';
import browserSync from 'browser-sync';
import webpackStream from 'webpack-stream';

export const scriptDev = () => {
    return app.gulp.src('./src/js/*.js')
        .pipe(gulpPlumber(app.settings.plumberNotify('JS')))
        .pipe(webpackStream(webpackConfig('development')))
        .pipe(app.gulp.dest('./app/js/'))
        .pipe(gulpChangedInPlace())
        .pipe(browserSync.stream());
}