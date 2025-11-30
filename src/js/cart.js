import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  const productList = document.querySelector(".product-list");
  
    // if (!productList) {
    //   console.error("no .product-list element found in cart.js")
    //   return;
  // }
  
    // If cart is empty
    // if (cartItems.length === 0) {
    //   productList.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
    //   return;
    // }
  
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    productList.innerHTML = htmlItems.join("");

    document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", updateQuantity);
    });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <label>Qty:
      <input type="number" min="1" value="${item.quantity}"
              data-id="${item.Id}" class="qty-input">
    </label>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function updateQuantity(event) {
  const newQty = parseInt(event.target.value);
  const id = event.target.dataset.id;

  let cart = getLocalStorage("so-cart") || [];
  
  if (!Array.isArray(cart)) {
    cart = [cart];
  }

  cart = cart.map(item => {
    if (item.Id == id) {
      item.quantity = newQty;
    }
    return item;
  });

  localStorage.setItem("so-cart", JSON.stringify(cart));

  renderCartContents();

}

export function addToWishlist(product) {
  let list = getLocalStorage("so-wishlist") || [];
  const exists = list.find(item => item.Id === product.Id);

  if (!exists) {
    list.push(product);
    setLocalStorage("so-wishlist", list);
  }
}

export function moveWishlistToCart(productId) {
  let wishlist = getLocalStorage("so-wishlist") || [];
  let cart = getLocalStorage("so-cart") || [];

  const item = wishlist.find(p => p.Id === productId);
  if (!item) return;

  // remove from wishlist
  wishlist = wishlist.filter(p => p.Id !== productId);
  setLocalStorage("so-wishlist", wishlist);

  // add to cart or increment
  const exists = cart.find(p => p.Id === item.Id);
  if (exists) {
    exists.Quantity++;
  } else {
    item.Quantity = 1;
    cart.push(item);
  }
  setLocalStorage("so-cart", cart);
}

loadHeaderFooter();
renderCartContents();




