import { test, expect } from "@playwright/test";

test("GET /products - returns not empty products list", async ({ request }) => {
  const response = await request.get("https://fakestoreapi.com/products");

  expect(response.status()).toBe(200);
  const products = await response.json();
  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);
});

test("GET /products/1 - returns product with correct structure", async ({
  request,
}) => {
  const productId = 1;

  const response = await request.get(
    `https://fakestoreapi.com/products/${productId}`
  );

  expect(response.status()).toBe(200);
  const product = await response.json();
  expect(typeof product).toBe("object");
  expect(Array.isArray(product)).toBe(false);
  expect(product.id).toBe(productId);
  expect(product).toHaveProperty("title");
  expect(product).toHaveProperty("price");
  expect(product).toHaveProperty("category");
});

test("POST /products creates new product", async ({ request }) => {
  const newProduct = {
    title: "My product",
    price: 49.99,
    description: "Product from API test",
    image: "https://i.pravatar.cc",
    category: "something",
  };

  const response = await request.post("https://fakestoreapi.com/products", {
    data: newProduct,
  });
  expect(response.status()).toBe(201);
  const createdProduct = await response.json();

  expect(createdProduct).toHaveProperty("id");
  expect(createdProduct.title).toBe(newProduct.title);
  expect(createdProduct.price).toBe(newProduct.price);
  expect(createdProduct.category).toBe(newProduct.category);
});
