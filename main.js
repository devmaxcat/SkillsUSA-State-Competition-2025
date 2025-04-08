const sitenav = `

<a href="index.html">Home</a>
<a href="products.html">Products</a>
<a>About</a>
<a>Contact</a>


`;

const rootURL = document.location.origin;
console.log("Root URL: ", rootURL);
const logoSvg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
  <defs>
    <style>
      .cls-1, .cls-2 {
        fill: none;
        stroke: #47613b;
        stroke-miterlimit: 10;
        stroke-width: 75px;
      }

      .cls-2 {
        stroke-linecap: round;
      }
    </style>
  </defs>
  <g>
    <path class="cls-2" d="M403.86,1649.41s-3.07-1034.45,1242.15-1242.58"/>
    <path class="cls-2" d="M1646.91,406s2.45,1034.71-1242.77,1242.83"/>
  </g>
  <path class="cls-1" d="M422.93,1606.09S953.57,799.17,1613.38,412.53"/>
  <path class="cls-1" d="M817.97,1100.56s345.95-296.84,572.49-41.29"/>
</svg>`

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
                    ${logoSvg}Green Glow Goods
                </div>
                <nav>
                    ${sitenav}
                </nav>
            </header>
            
            `;
        } else if (!e.querySelector(".hamburger-nav")) {
            e.outerHTML = `
            <header>
                <div class="logo">
                    ${logoSvg}Green Glow Goods
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
    scentsvary: "Scents Vary",
    tinrecyclable: "Tin Recyclable Or Reusable",
    machinewashable: "Machine Washable",
    sixcolors: "Six Colors",
    dishwashersafe: "Dishwasher Safe",
    instagrammable: "Instagrammable",
    choosefromsixdesigns: "Choose From Six Designs",
    growsinmostsoil: "Grows in Most Soil",
}
const products = [
    {
        name: "GlowBars",
        subname: "- All-Natural Shampoo Cubes",
        tagline: "Lather up, leave no trace.",
        description: "These waterless shampoo cubes activate in your hands — not a plastic bottle in sight. Infused with jojoba, nettle, and good karma.",
        price: 12.99,
        image: rootURL + "/public/products/0.png",
        tags: [tags.vegan, tags.compostablepackaging],
    }, 
    {
        name: "Wick'd Sense",
        subname: "- Recycled Candle Tins",
        tagline: "Lather up, leave no trace.",
        description: "These waterless shampoo cubes activate in your hands — not a plastic bottle in sight. Infused with jojoba, nettle, and good karma.",
        price: 12.99,
        image: rootURL + "/public/products/1.png",
        tags: [tags.scentsvary, tags.tinrecyclable],
    },
    {
        name: "EcoTote",
        subname: "- The Bag That Bags Plastic",
        tagline: "This tote could carry a watermelon… sustainably.",
        description: "Made from 100% recycled water bottles and stitched with sass. Each tote prevents 10+ plastic bottles from entering oceans.",
        price: 24.00,
        image: rootURL + "/public/products/2.png",
        tags: [tags.machinewashable, tags.sixcolors],
    },
    {
        name: "The Last Straw",
        subname: "(Set of 4)",
        tagline: "Sip happens. Do it sustainably",
        description: "Stainless steel straws with engraved positive affirmations like “Sip Smart” and “Ocean Lover.” Comes with a coconut fiber cleaning brush and a hemp pouch.",
        price: 8.75,
        image: rootURL + "/public/products/3.png",
        tags: [tags.dishwashersafe, tags.instagrammable],
    },
    {
        name: "Plant Me!",
        subname: "Greeting Cards",
        tagline: "Send love that grows",
        description: "Seed-infused paper cards that bloom into wildflowers once planted. Biodegradable ink and compostable sleeves.",
        price: 5.00,
        image: rootURL + "/public/products/4.png",
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
           
             <div class="tags">
               ${this._product?.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
             </div>
           
            <h4>${this._product?.name}</h4>
            <p>${this._product?.description}</p>
            <div class="price-container">
             <p>$${this._product?.price}</p> 
            <button>Add to cart</button>
            </div>
             
           
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
    document.addEventListener("click", (e) => {
        console.log(e, e.target);
        if (e.target.classList.contains("hamburger")) {
            const nav = document.querySelector(".hamburger-nav");
            nav.classList.toggle("open");
        }
    })
})