import FileManager from "./file.manager.js";
import fs from 'fs';
export default class ProductManager extends FileManager {
  constructor() {
    super('./products.json');
  }

  create = async (data) => {
    const { title, description, code, price, status, stock, category, thumbnails } = data;

    const currentData = await this.get();

   
  const existingProduct = currentData.find((product) => product.code === code);
  if (existingProduct) {
    throw new Error("Product with the same code already exists");
  }

    const id = parseInt(this.getNextId(currentData));

    const product = {
      id,
      title,
      description,
      code,
      price,
      status: status === undefined ? true : status,
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

    const productIndex = currentData.findIndex((product) => product.id === parseInt(id));
  
    if (productIndex !== -1) {
     
      const updatedData = currentData.filter((product) => product.id !== parseInt(id));
  
   
      await fs.promises.writeFile(this.filename, JSON.stringify(updatedData));
  
      return true; 
    }
  
    return false; 
  };
}
