import gulpPlumber from 'gulp-plumber';
import fileInclude from "gulp-file-include";
import browserSync from 'browser-sync';

import gulpPrettier from '@bdchauvette/gulp-prettier';

export const htmlProd = () => {
    return app.gulp.src('./src/html/*.html')
    .pipe(gulpPlumber(app.settings.plumberNotify('HTML')))
    .pipe(fileInclude(app.settings.fileInclude))
    .pipe(
        gulpPrettier({
            tabWidth: 2,
            useTabs: true,
            printWidth: 182,
            trailingComma: 'es5',
            bracketSpacing: false,
        })
    )
    .pipe(app.gulp.dest('./app/'))
    .pipe(browserSync.stream());
}
