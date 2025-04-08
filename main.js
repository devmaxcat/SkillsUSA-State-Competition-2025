const sitenav = `
<nav>
<a>Home</a>
<a>Products</a>
<a>About</a>
<a>Contact</a>
</nav>

`;

const rootURL = document.location.origin;


class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._onResize = this._onResize.bind(this); // Bind the method

    }

    connectedCallback() {
        this.outerHTML = `
        <header>
            <div class="logo">
                Green Glow Goods
            </div>
            <nav>
                ${sitenav}
            </nav>
        </header>
        
        `;
    }

    _onResize() {
        console.log("Resizing...");
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (width < 768) {
            this.outerHTML = `
            <header>
                <div class="logo">
                    Green Glow Goods
                </div>
                <button class="hamburger">X</button>
                <nav>
                    ${sitenav}
                </nav>
            </header>
        
        `;
        }
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
        ${sitenav}
        </footer>
        `;
    }
}
customElements.define("site-footer", Footer);
const tags = {
    vegan: "Vegan",
    compostablepackaging: "Compostable Packaging",
}
const products = [
    {
        name: "GlowBars",
        name_longer: "- All-Natural Shampoo Cubes",
        tagline: "Lather up, leave no trace.",
        description: "These waterless shampoo cubes activate in your hands — not a plastic bottle in sight. Infused with jojoba, nettle, and good karma.",
        price: 12.99,
        image: rootURL + "/public/product/0.png",
        tags: [tags.vegan, tags.compostablepackaging],
    }
]

class ProductCard extends HTMLElement {
    _product = null;
    constructor() {
        super();
       
    }
    render() {

        this.outerHTML = `
        <div class="${this._product ? "product-card" : "product-card loading"}">
            <img src="${this._product?.image}" alt="${this._product?.name}">
             <p>$${this._product?.price}</p> 
             <div class="tags">
               ${this._product?.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
             </div>
           
            <h4>${this._product?.name}</h4>
            <p>${this._product?.description}</p>
           
        </div>
        `;

    }
    connectedCallback() {
        this.product = products[this.dataset.productid];

    }
    set product(product) {
        this._product = product;
        this.render();
    }

}
customElements.define("product-card", ProductCard);

window.addEventListener("DOMContentLoaded", () => {
    
})