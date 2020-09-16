import React, { useState } from "react";

declare interface ProductsAdviceProps {
  setForm: (e) => void; // To pass the form to the modal
  confirm: () => void;
  updateProduct: any; // if you want to update a products or create one
}

function ProductsAdvice(props: ProductsAdviceProps) {
  console.log("props", props);

  return <div>ConseilsUser</div>;
}

export default ProductsAdvice;
