import { Unit } from "./Unit";
import { CompanyImage } from "./CompanyImage";

interface CompanyProductImage {
  companyImage: CompanyImage;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  cover: CompanyProductImage;
  description: string;
  unit: Unit;
  quantityForUnit: number;
  averageMark: number;
  numberOfMarks: number;
}
