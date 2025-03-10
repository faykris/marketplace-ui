export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  image_url?: string;
  ownerUsername?: string;
}

export type ProductPayload = {
  name: string;
  price: number;
  quantity: number;
  sku: string;
  imageUrl: string;
  ownerId: number;
};
