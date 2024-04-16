import {
    _slideUp,
    _slideToggle,
    _displayFadeUp,
    _displayFadeToggle
} from "../modules/slide";

export default function WdSpoller(element) {
    if (!element) return;
    element.wdSpoller = new Spoller(element);
}

class Spoller {
    constructor(element) {
        this.element = element;
        if (!this.element) return;
        this.items = element.querySelectorAll('[data-spollers-item]');
        this.animation = this.element.dataset.spollersAnimation || 'default';
        this.mode = this.element.dataset.spollersMode || 'default';
        this.speed = this.element.dataset.spollersSpeed || 300;
        this.isActive = false;

        this.init();

        this.attributeNames = {
            item: 'data-spollers-item',
            button: 'data-spollers-btn',
            body: 'data-spollers-body'
        }
    }

    init() {
        this.element.addEventListener('click', this.change.bind(this));
    }

    change(e) {
        const target = e.target;
        const button = target.closest(`[${this.attributeNames.button}]`);
        if (button) {
            const currentItem = button.closest(`[${this.attributeNames.item}]`);
            this.toggleItem(currentItem);
        }
    }


    toggleItem(currentItem) {
        const body = this.getItemBody(currentItem);
        if (body.classList.contains('_slide')) return;

        if (this.mode === 'one') {
            Array.from(this.items).filter(item => currentItem !== item).forEach(item => {
                this.close(item);
            });
        }

        this.toggle(currentItem);
    }

    open() {

    }

    close(item) {
        const body = this.getItemBody(item);
        item.classList.remove('_active');
        if (this.animation === 'display') {
            _displayFadeUp(body, this.speed);
            return
        }
        _slideUp(body, this.speed);
    }

    toggle(item) {
        const body = this.getItemBody(item);
        item.classList.toggle('_active');
        if (this.animation === 'display') {
            _displayFadeToggle(body, this.speed);
            return
        }
        _slideToggle(body, this.speed);
    }

    getItemBody(item) {
        return item.querySelector(`[${this.attributeNames.body}]`);
    }
}


// const spollers = document.querySelectorAll('[data-spollers]');
// spollers.forEach(spoller => WdSpoller(spoller));

/* <div data-spollers class="spollers">
    <div class="spollers__item" data-spollers-item>
        <button type="button" data-spollers-btn class="btn btn-reset spollers__title">Заголовок спойлера 1</button>
        <div class="spollers__body" data-spollers-body hidden>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur vel eius illum, modi facere nisi asperiores suscipit hic ea recusandae perspiciatis optio magni mollitia dolor doloremque cupiditate id. Beatae, asperiores?
        </div>
    </div>
</div> */