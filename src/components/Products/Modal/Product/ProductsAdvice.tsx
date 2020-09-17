import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";

declare interface ProductsAdviceProps {
  setForm: (e) => void; // To pass the form to the modal
  confirm: () => void;
  updateProduct: any; // if you want to update a products or create one
}

function ProductsAdvice(props: ProductsAdviceProps) {
  console.log("props", props);

  return (
    <TextArea
      rows={4}
      placeholder={
        "Ici, vous pouvez écrire vos conseils d'utilisation sur votre produit..."
      }
    />
  );
}

export default ProductsAdvice;
