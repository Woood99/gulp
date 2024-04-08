const debounce = (callback, delay = 250) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay)
    }
};

export default debounce;


// function callback() {
//     console.log('resize');
// }

// window.addEventListener('resize', debounce(callback, 500));