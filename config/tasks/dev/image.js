import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import webp from 'gulp-webp';

export const imageDev = () => {
    return app.gulp.src([`./src/img/**/**.{jpg,jpeg,png,svg}`], {
            encoding: false
        })
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
        .pipe(app.gulp.dest('./app/img/'))
        .pipe(app.gulp.src([`./src/img/**/**.{jpg,jpeg,png,svg}`], {
            encoding: false
        }))
        .pipe(webp())
        .pipe(app.gulp.dest('./app/img/'))
};