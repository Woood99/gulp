import 'focus-visible';
import Modal from './functions/modal';
import Tooltip from './functions/tooltip';
import './functions/fix-fullheight';

document.addEventListener('DOMContentLoaded', () => {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }
    const modalSettings = {};

    const modal = new Modal(modalSettings);

    const tooltipHtml = new Tooltip({
        mode: 'html',
        gap: 10,
        targetSelector: '[data-tooltip-html]',
        elementSelector: 'tooltip-html',
        animation: {
            type: 'fade-up',
            speed: 300,
            transformGap: '10px'
        },
    });

    const tooltip = new Tooltip({
        mode: 'default',
        gap: 10,
        position: 'bottom',
    });


});