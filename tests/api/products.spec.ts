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

test("PUT /products updates product data", async ({ request }) => {
  const productId = 1;

  const updatedProduct = {
    title: "Updated product title",
    price: 79.99,
    description: "Updated description from test",
    image: "https://i.pravatar.cc",
    category: "electronics",
  };

  const response = await request.put(
    `https://fakestoreapi.com/products/${productId}`,
    {
      data: updatedProduct,
    }
  );

  expect(response.status()).toBe(200);
  const product = await response.json();
  expect(product.id).toBe(productId);
  expect(product.title).toBe(updatedProduct.title);
  expect(product.price).toBe(updatedProduct.price);
  expect(product.category).toBe(updatedProduct.category);
});

test("DELETE /products deletes product", async ({ request }) => {
  const productId = 1;

  const response = await request.delete(
    `https://fakestoreapi.com/products/${productId}`
  );

  expect(response.status()).toBe(200);
  const deletedProduct = await response.json();
  expect(deletedProduct.id).toBe(productId);

  // because it is fake store api - below code would be false because in fake store does not have real state of an item. so deleted item in fact isn't deleted
  // but in the test I wrote we can see that status of response is 200 so item theoretically should be deleted

  // await request.delete(`/products/${id}`);
  // const getResponse = await request.get(`/products/${id}`);
  // expect(getResponse.status()).toBe(404);
});

test("DELETE /products with invalid id returns error", async ({ request }) => {
  const response = await request.delete(
    "https://fakestoreapi.com/products/99999"
  );

  expect(response.status()).toBe(200);
  // that is what clarification of what I wrote in test "DELETE /products deletes product" - even not existing product is deleted.
});
