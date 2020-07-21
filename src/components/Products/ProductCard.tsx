import React from "react";
import { Product } from "../../interfaces/Product";
import { EditOutlined } from "@ant-design/icons/lib";

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
  return (
    <div
      className={"product-card"}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={style}
      onClick={onClick}
    >
      <span className="card-foreground">
        <EditOutlined className={"icon"} />
      </span>
      <span
        className="card-background"
        style={{
          backgroundImage: product.cover
            ? `url('${"https://media.terradia.eu/" + product.cover.filename}')`
            : null,
        }}
      />
      <div className="card-title card-item">
        <div>
          {`${
            productName.length > 25
              ? productName.substr(0, 25) + "..."
              : productName
          }`}
        </div>
      </div>
      <p className="card-information card-item" />
      <p className="card-information card-item price">
        <span>{product.price.toFixed(2) + "€"}</span>
        <span>/</span>
        <span>
          {product.quantityForUnit +
            (product.unit ? product.unit.notation : " Pièce(s)")}
        </span>
      </p>
    </div>
  );
};

export default ProductCard;
