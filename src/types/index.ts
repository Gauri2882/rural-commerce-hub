
export interface Shop {
  id: string;
  name: string;
  description: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
  floorId: string;
  categoryId: string;
  imageUrl: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  shopId: string;
  categoryId: string;
  imageUrl: string;
  features: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Floor {
  id: string;
  name: string;
  description: string;
  level: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  shopId: string;
  productId: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}
