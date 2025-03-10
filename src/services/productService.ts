import { Product, ProductPayload } from "../types/product.ts";
import { API_URL } from "../utils/constants.ts";

const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);

  return await response.json();
};

const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products/search?q=${query}`);

  return response.json();
};

const getProductsByOwnerId = async (ownerId: string): Promise<Product[]> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/products/owners?id=${ownerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

const createProduct = async (product: ProductPayload): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(product),
  });

  return response.json();
};

const deleteProduct = async (productId: string): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return response.json();
};

export default {
  getAllProducts,
  searchProducts,
  getProductsByOwnerId,
  createProduct,
  deleteProduct,
};
