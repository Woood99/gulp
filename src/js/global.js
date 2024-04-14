import 'focus-visible';
import './functions/fix-fullheight';
import './_settings';

import wdCalendar from './functions/calendar';

document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('click', (e) => {
        const target = e.target;
    })

    wdCalendar(document.querySelector('.my-calendar'));
});