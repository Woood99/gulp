import gulp from 'gulp';
import browserSync from 'browser-sync';

import settings from './config/settings.js';

import {
    clean
} from './config/tasks/global/clean.js';
import {
    resources
} from './config/tasks/global/resources.js';
import {
    svgSprites
} from './config/tasks/global/sprite.js';

import {
    htmlDev
} from './config/tasks/dev/html.js';
import { htmlProd } from './config/tasks/prod/html.js';
import {
    sassDev
} from './config/tasks/dev/sass.js';
import { sassProd } from './config/tasks/prod/sass.js';
import {
    scriptDev
} from './config/tasks/dev/script.js';
import { scriptProd } from './config/tasks/prod/script.js';

import {
    imageDev
} from './config/tasks/dev/image.js';


global.app = {
    gulp,
    settings
}

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: './app',
        },
        notify: false,
        port: 3000,
    });

    gulp.watch(`./src/html/**/*.html`, htmlDev);
    gulp.watch('./src/scss/**/*.scss', sassDev);
    gulp.watch('./src/js/**/*.js', scriptDev);
    gulp.watch('./src/resources/**', resources);
    gulp.watch('./src/img/**/*', imageDev);
    gulp.watch('./src/img/svg/**.svg', svgSprites);
}

// ==============================================================================================================

const dev = gulp.series(clean, resources,
    gulp.parallel(htmlDev, sassDev, scriptDev),
    imageDev,
    svgSprites,
    watcher
);

const prod = gulp.series(clean, resources,
    gulp.parallel(htmlProd, sassProd, scriptProd),
    imageDev,
    svgSprites
);

gulp.task('default', dev);
gulp.task('prod', prod);
gulp.task('clean', clean);