export const resources = () => {
    return app.gulp.src('./src/resources/**', {
            encoding: false
        })
        .pipe(app.gulp.dest('./app'))
}