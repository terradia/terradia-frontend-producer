import React from "react";
import { Card, Checkbox, Image } from "antd";
import { CompanyImage } from "../../interfaces/CompanyImage";
import TerradiaLoader from "../TerradiaLoader";

interface Props {
  companyImage: CompanyImage;
  onClick?: () => void;
  selected?: boolean;
}

const ImageCard: React.FC<Props> = ({
  companyImage,
  selected = false,
  onClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: Props) => {
  return (
    <div className={"image-card"}>
      <Card
        key={companyImage.filename}
        className={"selectable-image-card"}
        onClick={onClick}
        bodyStyle={{ height: 0, padding: 0 }}

        cover={
          <Image
            className={`${selected ? "selected" : ""}`}
            alt={companyImage.filename}
            src={`https://media.terradia.eu/${companyImage.filename}`}
            placeholder={<TerradiaLoader />}
          />
        }
      />
      <span className={"checkbox"}>
        <Checkbox checked={selected} onClick={onClick} />
      </span>
    </div>
  );
};

export default ImageCard;
