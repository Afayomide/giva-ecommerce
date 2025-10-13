import { API_BASE_URL } from "@/components/api-url";
const BASE_URL = API_BASE_URL || "/api";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  types?: string[];
  images?: string[];
  categories: string[];
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  quantity: number;
  status: string;
}

export interface CartResponseItem {
  _id: string; // cart item id
  product: Product;
  quantity: number;
  size?: string;
  colors?: string;
}

export interface CartResponse {
  _id: string;
  user: string;
  items: CartResponseItem[];
}

export async function getProducts(searchTerm: string): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products?searchTerm=${searchTerm}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

export async function initiatePayment(data: {
  email: string;
  amount: number;
  address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  items: Array<{
    product: string;
    quantity: number;
    price: number;
    size?: string;
    colors?: string[];
  }>;
}) {
  const response = await fetch(`${BASE_URL}/payments/initiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to initiate payment");
  return response.json();
}

export async function verifyPayment(reference: string) {
  const response = await fetch(`${BASE_URL}/payments/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ reference }),
  });
  if (!response.ok) throw new Error("Failed to verify payment");
  return response.json();
}

export async function getCart(): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL}/cart`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
}

export async function addToCartAPI(payload: {
  productId: string;
  quantity?: number;
  size?: string;
  color?: string;
}): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) throw new Error("Failed to add to cart");
  console.log(response)
  return response.json();
}

export async function updateCartItemAPI(payload: {
  itemId: string;
  quantity: number;
}): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL}/cart/update`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to update cart item");
  return response.json();
}

export async function removeCartItemAPI(itemId: string): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL}/cart/item/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to remove cart item");
  return response.json();
}

export async function clearCartAPI(): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL}/cart/clear`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to clear cart");
  return response.json();
}
