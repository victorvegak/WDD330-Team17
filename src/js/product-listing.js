import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();


const category = getParam("category");


const categoryDisplay = category.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());


document.querySelector(".title").textContent = categoryDisplay;


const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);
myList.init();
