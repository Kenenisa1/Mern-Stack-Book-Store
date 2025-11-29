import express from "express";
import {getProducts, updateProduct,createProduct,deleteProduct} from "../controllers/product.controller.js"
const route = express.Router();


route.get("/", getProducts);

route.post("/",  createProduct);

route.delete("/:id", deleteProduct);

route.put("/:id", updateProduct)

export default route;