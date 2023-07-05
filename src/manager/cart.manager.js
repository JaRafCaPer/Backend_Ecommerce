import FileManager from "./file.manager.js";
import products from "../../products.json"assert { type: "json" };


export default class CartManager extends FileManager {
  constructor() {
    super("./carts.json");
  }

  create = async () => {
    const data = {
      id: this.getNextId(await this.get()),
      products: [],
    };
    return await this.set(data);
  }

  list = async (cid) => {
    const cart = await this.getById(cid);
    if (cart) {
      return cart.products;
    } else {
      throw new Error("Cart not found");
    }
  }

  add = async (cid, pid, quantity) => {
    if (quantity === undefined) {
      throw new Error("You must provide quantity");
    }
  
    const parsedQuantity = parseInt(quantity);
  
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      throw new Error("Quantity must be a positive number");
    }
  
    const cart = await this.getById(cid);
    const existingProduct = cart.products.find((product) => product.id === pid);
  
    if (existingProduct) {
      existingProduct.quantity += parsedQuantity;
    } else {
      const product = products.find((product) => product.id === pid);
  
      if (!product) {
        throw new Error("Product not found");
      }
  
      cart.products.push({ id: pid, quantity: parsedQuantity });
    }
  
    return await this.update(cart);
  };
  
  
}
