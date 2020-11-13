import React from "react";
import { Product } from "../../../../interfaces/Product";
import { FileImageOutlined } from "@ant-design/icons/lib";
import { Rate, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  provided: any;
  snapshot: any;
  style: StyleSheet;
  onClick: () => void;
  product: Product;
}

const ProductCard: React.FC<Props> = ({
  provided,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  snapshot,
  style,
  onClick,
  product,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: Props) => {
  const productName = product.name;
  const { t } = useTranslation("common");
  if (!product.unit) console.log(product);
  return (
    <Tooltip title={t("ProductsPage.ProductCard.tooltip")} placement={"top"}>
      <div
        className={"product-card"}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={style}
        onClick={onClick}
      >
        {/*<span className="card-foreground">*/}
        {/*  <EditOutlined className={"icon"} />*/}
        {/*</span>*/}
        <div
          className={"image-container"}
          style={{
            backgroundImage: product.cover
              ? `url('${
                  "https://media.terradia.eu/" +
                  product.cover.companyImage.filename
                }')`
              : null,
          }}
        >
          {!product.cover && <FileImageOutlined />}
        </div>
        <div className={"info-container"}>
          <div className={"product-name"}>
            {`${
              productName.length > 25
                ? productName.substr(0, 25) + "..."
                : productName
            }`}
          </div>
          <div className={"second-line"}>
            <div className={"price-info"}>
              <span>
                {product.price.toFixed(2) + "€"}
                {` / ${product.quantityForUnit}${product.unit.notation}`}
              </span>
            </div>
            <div className={"mark-info"}>
              <Rate disabled allowHalf value={product.averageMark} />
            </div>
          </div>
        </div>
        {/*<span*/}
        {/*  className="card-background"*/}
        {/*  style={{*/}
        {/*    backgroundImage: product.cover*/}
        {/*      ? `url('${*/}
        {/*          "https://media.terradia.eu/" +*/}
        {/*          product.cover.companyImage.filename*/}
        {/*        }')`*/}
        {/*      : null,*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<div className="card-title card-item">*/}
        {/*  <div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<p className="card-information card-item" />*/}
        {/*<p className="card-information card-item price">*/}
        {/*  <span>{product.price.toFixed(2) + "€"}</span>*/}
        {/*  <span>/</span>*/}
        {/*  <span>*/}
        {/*    {product.quantityForUnit +*/}
        {/*      (product.unit ? product.unit.notation : " Pièce(s)")}*/}
        {/*  </span>*/}
        {/*</p>*/}
      </div>
    </Tooltip>
  );
};

export default ProductCard;
