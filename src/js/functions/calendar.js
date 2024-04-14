export default function wdCalendar(element, options) {
    if (!element) return;
    element.wdCalendar = new Calendar(element, options);
}

class Calendar {
    constructor(element, options) {
        this.container = element;
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;
        this.table = null;
        this.nav = true;
        this.html = {
            prev: `
            <button type="button">prev</button>
        `,
            next: `
            <button type="button">next</button>
        `,
        };
        this.headerList = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
        this.monthList = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        Object.assign(this, options);
        this.date = new Date(this.currentYear, this.currentMonth - 1);
        this.init();
    }

    init() {
        this.container.classList.add("wd-calendar");
        this.createCalendar();
    }
    createToolbar() {
        const html = `
        <div class="wd-calendar__toolbar">
            ${this.nav ? this.createNav() : this.createTitle()}
        </div>
        `;
        this.container.insertAdjacentHTML('afterbegin', html);

        if (this.nav) {
            this.navPrev = this.container.querySelector(".wd-calendar__nav > :nth-child(1)");
            this.navNext = this.container.querySelector(".wd-calendar__nav > :nth-child(2)");

            if (this.navPrev) {
                this.navPrev.addEventListener("click", this.prev.bind(this));
            }
            if (this.navNext) {
                this.navNext.addEventListener("click", this.next.bind(this));
            }
        }
    }

    createTitle() {
        return `${this.monthList[this.currentMonth - 1]} ${this.currentYear}`;
    }

    createCalendar() {
        this.destroy();
        this.createToolbar();
        const html = `
        <table class="wd-calendar__table">
            <tr>
                ${this.headerList.map(item => `<th><span>${item}</span></th>`).join("")}
            </tr>
            ${this.createBody()}
        </table>
        `;
        this.container.insertAdjacentHTML("beforeend", html);
        this.table = this.container.querySelector(".wd-calendar__table");
    }

    createNav() {
        return `
            <div class="wd-calendar__nav">
                ${this.html.prev}
                ${this.createTitle()}
                ${this.html.next}
            </div>
        `;
    }

    createBody() {
        return `
            ${this.generateMonth(this.currentYear, this.currentMonth - 1)}
        `;
    }

    prev() {
        if (this.currentMonth === 1) {
            this.currentMonth = 12;
            this.currentYear = this.currentYear - 1;
        } else {
            this.currentMonth = this.currentMonth - 1;
        }
        this.createCalendar();
    }

    next() {
        if (this.currentMonth === 12) {
            this.currentMonth = 1;
            this.currentYear = this.currentYear + 1;
        } else {
            this.currentMonth = this.currentMonth + 1;
        }
        this.createCalendar();
    }

    generateMonth(y, m) {
        let html = '';

        let firstDayOfMonth = new Date(y, m, 7).getDay();
        let lastDateOfMonth = new Date(y, m + 1, 0).getDate();
        let lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
        let i = 1;
        do {
            let dow = new Date(y, m, i).getDay();
            if (dow == 1) {
                html += '<tr>';
            } else if (i == 1) {
                html += '<tr>';
                let k = lastDayOfLastMonth - firstDayOfMonth + 1;
                for (let j = 0; j < firstDayOfMonth; j++) {
                    html += `
                    <td class="wd-calendar__day _not-current">
                        <div class="wd-calendar__day-frame">
                            ${k}
                        </div>
                    </td>`;
                    k++;
                }
            }
            const chk = new Date();
            const chkY = chk.getFullYear();
            const chkM = chk.getMonth();
            if (chkY == this.currentYear && chkM == this.currentMonth - 1 && i == new Date().getDate()) {
                html += `
                <td class="wd-calendar__day _today">
                    <div class="wd-calendar__day-frame">
                        ${i}
                    </div>
                </td>`;
            } else {
                html += `
                <td class="wd-calendar__day">
                    <div class="wd-calendar__day-frame">
                        ${i}
                    </div>
                </td>`;
            }
            if (dow == 0) {
                html += '</tr>';
            } else if (i == lastDateOfMonth) {
                let k = 1;
                for (dow; dow < 7; dow++) {
                    html += `
                    <td class="wd-calendar__day _not-current">
                        <div class="wd-calendar__day-frame">
                            ${k}
                        </div>
                    </td>`;
                    k++;
                }
            }
            i++;
        } while (i <= lastDateOfMonth);

        return html;
    }

    destroy() {
        this.container.innerHTML = '';
        if (this.table) {
            this.table.remove();
            this.table = null;
        }
        if (this.navNext) delete this.navNext;
        if (this.navPrev) delete this.navPrev;
    }
}