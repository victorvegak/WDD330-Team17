import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}
export default class ProductList {
  constructor(category, dataSource, listElement) {
    // You passed in this information to make the class as reusable as possible.
    // Being able to define these things when you use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // the dataSource will return a Promise...so you can use await to resolve it.
      const list = await this.dataSource.getData();
    // next, render the list – ** future **
      this.renderList(list);
  }
  
  renderList(list) {
    const htmlStrings = list.map(productCardTemplate);
    this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  
        // this.listElement.innerHTML = ''; // clear any old content

        // list.forEach(product => {
        //   const item = document.createElement('li');
        //   item.classList.add('product-card');
          
        //   // Jm - Discount indicator-product listing
        //   const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
        //   const discountPercent = isDiscounted
        //   ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
        //   : 0;

        //   item.innerHTML = `
        //   <h3>${product.name}</h3>
        //   <p>${product.description}</p>
        //   <strong>$${product.price}</strong>
        //   `;
        //   this.listElement.appendChild(item);
        // });
    }
}