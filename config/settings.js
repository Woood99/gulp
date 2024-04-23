import gulpNotify from 'gulp-notify';

const settings = {
    fileInclude: {
        prefix: '@',
        basepath: '@file'
    },
    plumberNotify(title) {
        return {
            errorHandler: gulpNotify.onError({
                title: title,
                message: 'Error <%= error.message %>',
                sound: false,
            }),
        };
    }
};

export default settings;