export function wdSelect(element) {
    if (!element) return;
    element.WdSelect = new WdSelect(element);
}
export function wdSelectActions(target) {
    const wdSelects = document.querySelectorAll('.wd-select');

    if (wdSelects.length > 0) {
        const currentSelect = target.closest('.wd-select');
        wdSelects.forEach(select => {
            if (select && select.WdSelect && select.WdSelect.isOpen && currentSelect !== select) select.WdSelect.close()
        });
    }
}

class WdSelect {
    constructor(element) {
        this.element = element;
        this.button = this.element.querySelector('.wd-select__button');
        this.valueSelector = this.element.querySelector('.wd-select__value');
        this.items = Array.from(this.element.querySelectorAll('.wd-select__item'));
        this.isOpen = false;
        this.placeholderText = element.dataset.placeholder || null;
        this.value = null;
        this.init();
    }

    init() {
        this.initClear();
        this.initPlaceholder();
        this.updateValue();
        this.element.addEventListener('click', elementHandlerClick.bind(this));

        function elementHandlerClick(e) {
            const target = e.target;
            const button = target.closest('.wd-select__button');
            const item = target.closest('.wd-select__item');
            if (button) {
                this.toggle();
            }
            if (item) {
                this.setItem(item);
                this.close();
            }
        }
    }

    initPlaceholder() {
        const itemPlaceholder = this.items.find(item => item.hasAttribute('data-placeholder'));
        const selectedItem = this.items.find(item => item.hasAttribute('selected'));
        if (selectedItem) {
            this.setItem(selectedItem);
            return;
        }
        if (itemPlaceholder) {
            this.setItem(itemPlaceholder);
            return;
        }
        if (this.placeholderText) {
            this.valueSelector.textContent = this.placeholderText;
            return;
        }
        this.setItem(0);
    }

    initClear() {
        const itemsSelected = this.items.filter(item => item.hasAttribute('selected'));
        if (itemsSelected.length <= 1) return;
        itemsSelected.forEach((item, index) => {
            if (index !== 0) {
                item.removeAttribute('selected')
            }
        })
    }

    open() {
        this.isOpen = true;
        document.body.classList.add('_wd-select-open');
        this.element.classList.add('_show');
    }

    close() {
        this.isOpen = false;
        document.body.classList.remove('_wd-select-open');
        this.element.classList.remove('_show');
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    updateValue() {
        const selectedItem = this.items.find(item => item.hasAttribute('selected'));
        if (selectedItem) {
            this.selectedItem = selectedItem;
            this.valueText = this.selectedItem.textContent;
            this.value = this.selectedItem.dataset.value;
        } else {
            this.selectedItem = null;
            this.valueText = null;
            this.value = undefined;
        }
        this.element.value = this.value;
        this.toggleSelectedClass();
   
        if (this.valueText) {
            this.valueSelector.textContent = this.valueText;
            return;
        }
    }

    setItem(value) {
        const item = typeof (value) === 'number' ? this.getItemFromIndex(value) : value;
        if (!item) return;
        this.clear();
        item.setAttribute('selected', '');
        item.classList.add('_selected');
        this.updateValue();
        this.element.dispatchEvent(new Event('change'));
    }

    clear() {
        this.items.forEach((el, index) => {
            const item = this.getItemFromIndex(index);
            if (item) {
                item.removeAttribute('selected');
                item.classList.remove('_selected');
            }
        })
        this.updateValue();
    }

    toggleSelectedClass() {
        if (!this.selectedItem) return;
        if (this.selectedItem.hasAttribute('data-placeholder')) {
            this.element.classList.remove('_selected');
            this.element.classList.add('_selected-placeholder');
        } else {
            this.element.classList.add('_selected');
            this.element.classList.remove('_selected-placeholder');
        }
    }

    getItemFromIndex(index) {
        return this.items[index];
    }

}


// const selects = document.querySelectorAll('.wd-select');
// selects.forEach(select => wdSelect(select));

/* <div class="wd-select" data-placeholder="fas">
<button type="button" class="btn btn-reset wd-select__button">
    <div class="wd-select__value"></div>
    <svg class="wd-select__check">
        <use xlink:href="./img/sprite.svg#check2"></use>
    </svg>
</button>
<div class="wd-select__dropdown">
    <ul class="wd-select__list list-reset">
        <li class="wd-select__item" data-value="all" data-placeholder="">Все</li>
        <li class="wd-select__item" data-value="one" selected>value 1</li>
        <li class="wd-select__item" data-value="two">value 2</li>
        <li class="wd-select__item" data-value="three">value 3</li>
    </ul>
</div>
</div> */