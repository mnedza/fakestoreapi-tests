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
