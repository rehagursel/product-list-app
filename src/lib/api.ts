import { ProductsData } from "../models/data.models"

const MOCK_DATA_URL = 'https://fakestoreapi.com';

export const getAllProducts = async (): Promise<ProductsData[]> => {
  const response = await fetch(`${MOCK_DATA_URL}/products`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Products could not load!');
  }

  return data;
}

