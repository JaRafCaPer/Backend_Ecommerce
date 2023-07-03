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
    await this.set(data);
    return data;
  };

  list = async (cartId) => {
    const cart = await this.getById(cartId);
    if (cart) {
      return cart.products;
    } else {
      throw new Error("Cart not found");
    }
  };

  add = async (cartId, productId) => {
    const cart = await this.getById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ id: productId, quantity: 1 });
    }

    await this.update(cart);
    return cart;
  };
}
