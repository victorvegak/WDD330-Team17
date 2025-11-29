import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");;
const listOfProductCards = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, listOfProductCards);

productList.init();

const mainElement = document.querySelector("main");

const alert = new Alert("./json/alert.json", mainElement);
alert.init();