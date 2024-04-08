const throttle = (callback, delay = 250) => {
    let isThrottled = false;
    let savedArgs = null;
    let savedThis = null;

    return function wrap(...args) {
        if (isThrottled) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        callback.apply(this, args);
        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;

            if (savedThis) {
                wrap.apply(savedThis, savedArgs);
                savedThis = null;
                savedArgs = null;
            }

        }, delay);
    }
};

export default throttle;


// function callback() {
//     console.log('resize');
// }

// window.addEventListener('resize', throttle(callback, 500));