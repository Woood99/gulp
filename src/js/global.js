import 'focus-visible';
import Modal from './functions/modal';
import './functions/fix-fullheight';

document.addEventListener('DOMContentLoaded', () => {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }
    const modalSettings = {};

    const modal = new Modal(modalSettings);
});