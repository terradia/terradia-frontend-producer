import React from "react";
import { LoadingOutlined } from "@ant-design/icons/lib";

interface Props {
  size?: number;
}

const TerradiaLoader: React.FC<Props> = ({ size, ...props }) => (
  <LoadingOutlined style={{ fontSize: size ? size : 40 }} {...props} />
);

export default TerradiaLoader;
