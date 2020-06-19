import React from "react";
import { Card, Checkbox } from "antd";
import CompanyImage from "../../interfaces/CompanyImage";

interface Props {
  companyImage: CompanyImage;
  onClick?: () => void;
  selected?: boolean;
}

const ImageCard: React.FC<Props> = ({
  companyImage,
  selected = false,
  onClick,
  ...props
}: Props) => {
  return (
    <div className={"image-card"}>
      <Card
        key={companyImage.filename}
        className={"selectable-image-card"}
        onClick={onClick}
        cover={
          <img
            className={`${selected ? "selected" : ""}`}
            alt={companyImage.filename}
            src={`https://media.terradia.eu/${companyImage.filename}`}
          />
        }
        bodyStyle={{ height: 0, padding: 0 }}
      />
      <span className={"checkbox"}>
        <Checkbox checked={selected} onClick={onClick} />
      </span>
    </div>
  );
};

export default ImageCard;
