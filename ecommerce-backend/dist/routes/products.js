import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
// Create new Product
app.post("/new", adminOnly, singleUpload, newProduct);
// To get all products with filters
app.get("/all", getAllProducts);
// To get last 10 products
app.get("/latest", getLatestProducts);
// To get all unique categories
app.get("/categories", getAllCategories);
// To gete all Products
app.get("/admin-products", adminOnly, getAdminProducts);
app.route("/:id").get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteProduct);
export default app;
