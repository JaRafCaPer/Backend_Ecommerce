import { Router } from "express";
import CartManager from "../manager/cart.manager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.create();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cartProducts = await cartManager.list(cid);
    res.json(cartProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.add(cid, pid);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
