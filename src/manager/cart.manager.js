import FileManager from "./file.manager.js";

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

  add = async (cid, pid) => {
    const cart = await this.getById(cid);
    const existingProduct = cart.products.find((product) => product.id === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ id: pid, quantity: 1 });
    }
    return await this.update(cart);
  }
}
