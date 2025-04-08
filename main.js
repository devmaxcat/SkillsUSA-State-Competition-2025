class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.outerHTML = `
        <header>

        </header>
        `;
    }

}
customElements.define("site-header", Header);
class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.outerHTML = `
        <footer>
        
        </footer>
        `;
    }
}
customElements.define("site-footer", Footer);