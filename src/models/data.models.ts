export interface ProductsData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItemData {
  id: number;
  title: string;
  image: string;
  amount: number;
  price: number;
}

export interface CartData {
  cartItems: CartItemData[];
  totalPrice: number;
  totalAmount: number;
}
