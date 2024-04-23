import gulpPlumber from 'gulp-plumber';
import webpackConfig from '../../webpack.config.js';
import webpackStream from 'webpack-stream';

export const scriptProd = () => {
    return app.gulp.src('./src/js/*.js')
        .pipe(gulpPlumber(app.settings.plumberNotify('JS')))
        .pipe(webpackStream(webpackConfig('production')))
        .pipe(app.gulp.dest('./app/js/'))
}