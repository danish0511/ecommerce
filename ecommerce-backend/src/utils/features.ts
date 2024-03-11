import mongoose from "mongoose";
import { invalidateCacheProps, orderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "Ecommerce_24",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const invalidateCache = async({
  product,
  order,
  admin,
}: invalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
        "latest-products",
        "categories",
        "all=products",
    ];

    const products = await Product.find({}).select("_id");

    products.forEach(i => {
        productKeys.push(`product-${i._id}`);
    });

    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};


export const reduceStock = async(orderItems: orderItemType[]) => {

  for(let i=0; i<orderItems.length; i++)
  {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if(!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};