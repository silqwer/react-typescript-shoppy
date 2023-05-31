export interface Product {
  category: string;
  description: string;
  id: string;
  image: string;
  options: Record<string, string>;
  price: number;
  title: string;
}
