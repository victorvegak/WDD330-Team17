function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  // async getData() {
  //   try {
  //     const res = await fetch(this.path);
  //     return await convertToJson(res);
  //   } catch (err) {
  //     console.error("Failed to load product data:", err);
  //     return [];
  //   }
  // }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
