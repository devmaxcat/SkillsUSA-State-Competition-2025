const sitenav = `
<nav>
<a href="index.html">Home</a>
<a href="products.html">Products</a>
<a>About</a>
<a>Contact</a>
</nav>

`;

const rootURL = document.location.origin;


class Header extends HTMLElement {
    constructor() {
        super();
        this.handleResize = this.handleResize.bind(this);
       

    }
 // yes i know this is stupid, but i got limited time and i need to get this done
    connectedCallback() {
        window.addEventListener('resize', function() {
            Header._render( this.document.querySelector("header"))
           
        });
        this.render();
       
    }
   //same here
    render() {
        Header._render(this);
    }
    static _render(e) {
        if (window.innerWidth > 768) {
            e.outerHTML = `
            <header>
                <div class="logo">
                    Green Glow Goods
                </div>
                <nav>
                    ${sitenav}
                </nav>
            </header>
            
            `;
        } else {
            e.outerHTML = `
            <header>
                <div class="logo">
                    Green Glow Goods
                </div>
                <button class="hamburger">
                <div class="a"></div>
                <div class="b"></div>
                <div class="c"></div>
                </button>
                <nav class="hamburger-nav">
                    ${sitenav}
                </nav>
            </header>
            
            `;
        }
    }

    handleResize() {
        console.log("resize", window.innerWidth);
        this.render();
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
        subname: "- All-Natural Shampoo Cubes",
        tagline: "Lather up, leave no trace.",
        description: "These waterless shampoo cubes activate in your hands — not a plastic bottle in sight. Infused with jojoba, nettle, and good karma.",
        price: 12.99,
        image: rootURL + "/public/product/0.png",
        tags: [tags.vegan, tags.compostablepackaging],
    }, 
    {
        name: "Wick'd Sense",
        subname: "- Recycled Candle Tins",
        tagline: "Lather up, leave no trace.",
        description: "These waterless shampoo cubes activate in your hands — not a plastic bottle in sight. Infused with jojoba, nettle, and good karma.",
        price: 12.99,
        image: rootURL + "/public/product/1.png",
        tags: [tags.scentsvary, tags.tinrecyclable],
    },
    {
        name: "EcoTote",
        subname: "- The Bag That Bags Plastic",
        tagline: "This tote could carry a watermelon… sustainably.",
        description: "Made from 100% recycled water bottles and stitched with sass. Each tote prevents 10+ plastic bottles from entering oceans.",
        price: 24.00,
        image: rootURL + "/public/product/2.png",
        tags: [tags.machinewashable, tags.sixcolors],
    },
    {
        name: "The Last Straw",
        subname: "(Set of 4)",
        tagline: "Sip happens. Do it sustainably",
        description: "Stainless steel straws with engraved positive affirmations like “Sip Smart” and “Ocean Lover.” Comes with a coconut fiber cleaning brush and a hemp pouch.",
        price: 8.75,
        image: rootURL + "/public/product/3.png",
        tags: [tags.dishwashersafe, tags.instagrammable],
    },
    {
        name: "Plant Me!",
        subname: "Greeting Cards",
        tagline: "Send love that grows",
        description: "Seed-infused paper cards that bloom into wildflowers once planted. Biodegradable ink and compostable sleeves.",
        price: 5.00,
        image: rootURL + "/public/product/4.png",
        tags: [tags.choosefromsixdesigns, tags.growsinmostsoil],
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

class ProductsAll extends HTMLElement {
    constructor() {
        super();
       
    }
    connectedCallback() {
        this.render();
    }
    render() {

        this.outerHTML = `
       <div class="products-all">
       ${products.map((product, index) => `
        <product-card data-productid="${index}"></product-card>
         `).join("")}
       </div>
        `;

    }
   

}

customElements.define("products-all", ProductsAll);

window.addEventListener("DOMContentLoaded", () => {
    
})