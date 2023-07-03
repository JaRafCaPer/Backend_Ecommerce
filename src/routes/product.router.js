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
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  });

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const data = req.body;
  const result = await productManager.update({ ...data, id: pid });
  res.send(result);
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await productManager.delete(pid);
  if (result) {
    res.send({ message: "Product deleted successfully" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

export default router;
