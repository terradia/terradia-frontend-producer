import React, { CSSProperties, useState } from "react";
import "../../assets/Style/CompanyPage/Field.less";
import { CheckOutlined, EditOutlined } from "@ant-design/icons/lib";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

interface Props {
  value: string;
  label?: string;
  style?: CSSProperties;
  editable?: boolean;
  defaultEditMode?: boolean;
  type?: "phone" | "address" | "text" | "description";
  onStartEdit?: (value: any) => void;
  onValidate?: (value: any) => void;
}

const Field: React.FC<Props> = ({
  value,
  label,
  editable = true,
  defaultEditMode,
  style,
  type = "text",
  ...props
}) => {
  const [editMode, setEditMode] = useState(
    defaultEditMode ? defaultEditMode : false
  );
  const [inputValue, setValue] = useState(value);

  const handleClickEditBtn = () => {
    setEditMode(!editMode);
  };

  const handleChange = (data) => {
    console.log(data);
  };

  let inputComponent;
  switch (type) {
    case "description":
      inputComponent = (
        <TextArea
          key={"1"}
          value={inputValue}
          onChange={handleChange}
          rows={4}
        />
      );
      break;
    case "text":
    default:
      inputComponent = (
        <Input
          key={"1"}
          value={inputValue}
          onChange={handleChange}
          type={"text"}
        />
      );
      break;
  }

  return (
    <div className={"field main-container"} style={style}>
      {label && (
        <label
          className={"field-label" + (editMode === true ? " edit-mode" : "")}
        >
          {label}
        </label>
      )}
      <div className={"value-container"}>
        {editMode === true ? (
          <>{inputComponent}</>
        ) : (
          <span className={"field-value"}>{inputValue}</span>
        )}
        {editable === true && (
          <div className={"icon-container"} onClick={handleClickEditBtn}>
            {editMode === true ? <CheckOutlined /> : <EditOutlined />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Field;
