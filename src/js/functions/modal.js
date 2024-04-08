export default class Modal {
    constructor(options) {
        this.options = options;
        this.modalContainer = document.querySelector('.modal-container');
        this.modalsOpen = {}
        this.isOpen = false;
        this.previousActiveElement = null;
        this.currentModal = null;
        this._focusElements = [
            'a[href]',
            'input',
            'select',
            'textarea',
            'button',
            'iframe',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ];
        this._fixBlocks = document.querySelectorAll('.fix-block');
        this.init();
    }

    init() {
        if (!this.modalContainer) return;
        document.addEventListener('click', (e) => {
            const target = e.target;
            const openBtn = target.closest(`[data-modal-path]`);
            if (openBtn) {
                this.open(openBtn, openBtn.dataset.modalPath);
            }

            if ((target.classList.contains('modal') && target.classList.contains('is-open')) || target.closest('.js-modal-close')) {
                const modal = target.closest('[data-modal-target]');
                if (modal) this.close(modal.dataset.modalTarget);
            }
        });
        window.addEventListener('keydown', function (e) {
            if (e.keyCode == 27 && this.isOpen) {
                this.close(this.currentModal.name);
            }
            if (e.which == 9 && this.isOpen) {
                this.focusCatch(e);
                return;
            }
        }.bind(this));
    }

    open(btn, name) {
        const modal = document.querySelector(`[data-modal-target=${name}]`);
        if (modal) {
            const config = {
                name,
                btn,
                speed: 300,
                animation: 'fade',
                modal,
                container: function () {
                    if (this.modal) return this.modal.querySelector('.modal__container')
                },
                ...this.options[name]
            };
            this.modalsOpen[name] = config;

            this.openModal(this.modalsOpen[name]);
        }
    }

    close(name) {
        this.closeModal(this.modalsOpen[name]);
    }


    openModal(modal) {
        this.updateCurrentModal();
        if (!this.previousActiveElement) {
            this.previousActiveElement = document.activeElement;
        }

        const modalContainer = modal.container();


        this.modalContainer.classList.add('open');

        modal.modal.scrollTo(0, 0);

        modal.modal.style.setProperty('--transition-time', `${modal.speed / 1000}s`);
        modal.modal.classList.add('is-open');

        this.disableScroll();

        modalContainer.classList.add('modal-open')
        modalContainer.classList.add(modal.animation);


        setTimeout(() => {
            this.openDefault(modal);
            modalContainer.classList.add('animate-open');
            this.isOpen = true;
            this.focusTrap();
        }, modal.speed);
    }

    closeModal(modal) {
        if (modal) {
            const modalContainer = modal.container();
            modalContainer.classList.remove('animate-open');
            modalContainer.classList.remove(modal.animation);
            modal.modal.classList.remove('is-open');
            modalContainer.classList.remove('modal-open');

            const modalsOpenLength = Object.keys(this.modalsOpen).length;


            if (modalsOpenLength <= 1) {
                this.modalContainer.classList.remove('open');
                this.enableScroll();
                this.isOpen = false;
            }


            this.closeDefault(modal);
            delete this.modalsOpen[modal.name];

            this.updateCurrentModal();

            this.focusTrap();
        }
    }


    openDefault(modal) {
        if (modal.options && modal.options.isOpen) {
            modal.options.isOpen(this, modal);
        }
    }
    closeDefault(modal) {
        if (modal.options && modal.options.isClose) {
            modal.options.isClose(this, modal);
        }
    }


    disableScroll() {
        let pagePosition = window.scrollY;
        this.lockPadding();
        document.body.classList.add('dis-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        this.unlockPadding();
        document.body.style.top = 'auto';
        document.body.classList.remove('dis-scroll');
        window.scrollTo({
            top: pagePosition,
            left: 0
        });
        document.body.removeAttribute('data-position');
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
        this._fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset;
        });
        document.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
        this._fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.body.style.paddingRight = '0px';
    }


    focusCatch(e) {
        const nodes = this.currentModal.modal.querySelectorAll(this._focusElements);
        const nodesArray = Array.prototype.slice.call(nodes);
        const focusedItemIndex = nodesArray.indexOf(document.activeElement)
        if (e.shiftKey && focusedItemIndex === 0) {
            nodesArray[nodesArray.length - 1].focus();
            e.preventDefault();
        }
        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
            nodesArray[0].focus();
            e.preventDefault();
        }
    }

    focusTrap() {
        if (this.isOpen) {
            const nodes = this.currentModal.modal.querySelectorAll(this._focusElements);
            if (nodes.length) nodes[0].focus();
        } else {
            if (!this.currentModal) {
                this.previousActiveElement.focus();
                this.previousActiveElement = null;
            }
        }
    }

    updateCurrentModal() {
        if (Object.keys(this.modalsOpen).length >= 1) {
            this.currentModal = this.modalsOpen[Object.keys(this.modalsOpen).last()];
        } else {
            this.currentModal = null;
        }
    }
}


// const modalSettings = {};
// const modal = new Modal(modalSettings);