export default interface Product {
  id: string;
  name: string;
  price: number;
  cover: { id: string; filename: string; name: string | null };
  description: string;
  unit: { notation: string; name: string };
  quantityForUnit: number;
}
