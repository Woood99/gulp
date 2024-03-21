const notify = require('gulp-notify');

const settings = {
    fileInclude: {
        prefix: '@',
        basepath: '@file'
    },
    plumberNotify(title) {
        return {
            errorHandler: notify.onError({
                title: title,
                message: 'Error <%= error.message %>',
                sound: false,
            }),
        };
    }
};

module.exports = settings;