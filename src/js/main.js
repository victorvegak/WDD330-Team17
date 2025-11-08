import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

dataSource.getData().then((data) => {
    donsole.log("Tents data loaded:", data);
});