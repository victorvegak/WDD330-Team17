import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {

    this.product = await this.dataSource.findProductById(this.productId);


    this.renderProductDetails();


    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {

  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;


  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;


  const retail = product.SuggestedRetailPrice || product.FinalPrice;
  const discount =
    product.SuggestedRetailPrice
      ? Math.round((1 - product.FinalPrice / product.SuggestedRetailPrice) * 100)
      : 0;

  document.getElementById("discountDisplay").textContent =
    discount > 0 ? `${discount}% OFF` : "";

  document.getElementById("productPrice").innerHTML = `
    <span class="strike-through">$${retail}</span> | $${product.FinalPrice}
  `;

  const colorElement = document.getElementById("productColor");
  if (product.Colors && product.Colors.length > 0) {
    colorElement.textContent = product.Colors[0].ColorName;
  } else {
    colorElement.textContent = "N/A";
  }

  const description =
    product.DescriptionHtmlSimple ||
    product.DescriptionHtml ||
    product.Description ||
    "No description available.";
  document.getElementById("productDesc").innerHTML = description;

  document.getElementById("addToCart").dataset.id = product.Id;
}
