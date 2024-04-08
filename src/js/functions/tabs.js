export default function WoodTab(element) {
    if (!element) return;
    element.woodTab = new Tabs(element);
}

class Tabs {
    constructor(container) {
        this.container = container;
        this.buttonsList = this.container.querySelector('[data-tabs-buttons]');
        this.content = this.container.querySelector('[data-tabs-content]');
        this.buttons = Array.from(this.buttonsList.children);
        this.panels = Array.from(this.content.children);

        this.activeTab = null;

        if (this.buttons.length !== this.panels.length) {
            this.errorLength();
            return;
        }

        this.init();
    }

    init() {
        this.setIndex();
        this.container.classList.add('_init-tab');

        this.activeTab = this.buttons.find(button => button.classList.contains('_active')) || null;

        if (this.activeTab) {
            this.setTab(this.getIndexButton(this.activeTab));
        } else {
            this.setTab(0);
        }

        this.buttonsList.addEventListener('click', (e) => {
            const target = e.target;
            const button = target.closest('[data-tabs-button-index]');
            if (!button) return;
            const index = this.getIndexButton(button);
            this.setTab(index)
        })
    }

    setIndex() {
        this.buttons.forEach(setIndexButtons);
        this.panels.forEach(setIndexPanels);

        function setIndexButtons(button, index) {
            button.setAttribute('data-tabs-button-index', index);
        }

        function setIndexPanels(panel, index) {
            panel.setAttribute('data-tabs-panel-index', index);
        }
    }

    setTab(index) {
        const button = this.buttons.find(button => this.getIndexButton(button) == index);
        const panel = this.panels.find(panel => this.getIndexPanel(panel) == index);
        if (!button || !panel) return;

        this.clearTabs();

        this.activeTab = button;

        button.classList.add('_active');
        panel.removeAttribute('hidden');
    }

    clearTabs() {
        this.activeTab = null;
        this.buttons.forEach(button => button.classList.remove('_active'));
        this.panels.forEach(panel => panel.setAttribute('hidden', ''));
    }

    getIndexButton(button) {
        if (!button) return;
        return button.dataset.tabsButtonIndex;
    }

    getIndexPanel(panel) {
        if (!panel) return;
        return panel.dataset.tabsPanelIndex;
    }

    errorLength() {
        console.error(`У класса Tab количество кнопок и панелей не равно!`, this);
    }

}

// const tabs = document.querySelectorAll('[data-tabs]');
// tabs.forEach(tab => WoodTab(tab));