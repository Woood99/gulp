const gulp = require('gulp');

require('./config/base.js')
require('./config/dev.js')


gulp.task('default', gulp.series(
    'clean',
    'resources',
    gulp.parallel('html:dev', 'sass:dev', 'js:dev', 'image:dev'),
    gulp.parallel('svg-sprites'),
    'watch'
))