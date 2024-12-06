export interface IProduct {
  id: string;
  name: string;
  code: number;
  category: string;
  price: string;
}

export interface ProductResponse {
  products: IProduct[];
  total: number;
  page: number;
  totalPages: number;
}
