import gulpPlumber from 'gulp-plumber';
import fileInclude from "gulp-file-include";
import browserSync from 'browser-sync';
import gulpChangedInPlace from 'gulp-changed-in-place';

export const htmlDev = () => {
    return app.gulp.src('./src/html/*.html')
    .pipe(gulpPlumber(app.settings.plumberNotify('HTML')))
    .pipe(fileInclude(app.settings.fileInclude))
    .pipe(app.gulp.dest('./app/'))
    .pipe(gulpChangedInPlace())
    .pipe(browserSync.stream());
}
