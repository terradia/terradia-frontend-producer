import { Unit } from "./Unit";
import { CompanyImage } from "./CompanyImage";

export interface Product {
  id: string;
  name: string;
  price: number;
  cover: CompanyImage;
  description: string;
  unit: Unit;
  quantityForUnit: number;
}
