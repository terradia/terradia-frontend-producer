import React from "react";
import { ReactComponent as ProductLogo } from "../../../assets/Icon/page/Product Logo.svg";
import SvgContainer from "../SvgContainer";

declare interface ProductLogoProps {
  style?: React.CSSProperties;
}

const ProductIcon = (props: ProductLogoProps) => {
  return (
    <SvgContainer style={props.style}>
      <ProductLogo style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </SvgContainer>
  );
};

export default ProductIcon;
