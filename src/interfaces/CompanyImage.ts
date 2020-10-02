export interface CompanyProductsImage {
  companyImage: CompanyImage;
}

export interface CompanyImage {
  filename: string;
  id: string;
  name: string;
  products: [{ id: string; name: string }];
}
