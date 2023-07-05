import { Router } from "express";
import ProductManager from "../manager/product.manager.js";

const router = Router();
const productManager = new ProductManager();

// Middleware para verificar que los campos necesarios existan
const validateRequiredFields = (req, res, next) => {
  const { title, description, code, price, stock, category } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  next();
};

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const result = await productManager.list(limit);
  res.send(result);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await productManager.getById(pid);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

router.post("/", validateRequiredFields, async (req, res) => {
  const data = req.body;
  try {
    const result = await productManager.create(data);
    res.send(result);
    console.log("Product created successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
    console.log("Error creating product");
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updatedFields = req.body;
  const existingProduct = await productManager.getById(pid);

  if (!existingProduct) {
    return res.status(404).send({ message: "Product not found" });
  }

  const updatedProduct = {
    ...existingProduct,
    ...updatedFields,
    id: existingProduct.id, 
  };

  try {
    const result = await productManager.update(updatedProduct);
    res.send(result);
    console.log("Product updated successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const existingProduct = await productManager.getById(pid);

  if (!existingProduct) {
    return res.status(404).send({ message: "Product not found" });
  }

  try {
    const result = await productManager.delete(pid);
    if (result) {
      res.send({ message: "Product deleted successfully" });
      console.log("Product deleted successfully");
    } else {
      res.status(500).send({ message: "Failed to delete product" });
      console.log("Failed to delete product");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
    console.log("Error deleting product");
  }
});

export default router;
