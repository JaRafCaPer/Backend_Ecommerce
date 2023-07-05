import FileManager from "./file.manager.js";
import fs from 'fs';
export default class ProductManager extends FileManager {
  constructor() {
    super('./products.json');
  }

  create = async (data) => {
    const { title, description, code, price, stock, category, thumbnails } = data;

    const currentData = await this.get();

    const id = this.getNextId(currentData);

    const product = {
      id,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: thumbnails || [],
    };

    const result = await this.set(product);
    return result;
  };

  list = async () => {
    const result = await this.get();
    return result;
  };

  delete = async (id) => {
    const currentData = await this.get();
  
    // Find the index of the product with the matching ID
    const productIndex = currentData.findIndex((product) => product.id === parseInt(id));
  
    if (productIndex !== -1) {
      // Remove the product from the array
      currentData.splice(productIndex, 1);
  
      // Save the updated data to the file
      await this.set(currentData);
  
      return true; // Indicate successful deletion
    }
  
    return false; // Indicate product not found
  };
  
}
