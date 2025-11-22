import { renderListWithTemplate } from "./utils.mjs";




function productCardTemplate(product) {
    
    return `<li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`;
}
//src="${product.Images.PrimaryMedium}"
 //               alt= "Image of ${product.Name}"


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }


    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);

    };

    // renderList() {
    //     this.forEach((product) => {
    //         document.querySelector(".product-list").innerHTML = product.productCardTemplate();
    //     } )
    // }
    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    };


}





