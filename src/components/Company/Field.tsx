import React, { CSSProperties, useState } from "react";
import "../../assets/Style/CompanyPage/Field.less";
import { CheckOutlined, EditOutlined } from "@ant-design/icons/lib";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

import {
  IbanElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface Props {
  value: string;
  label?: string;
  name: string;
  style?: CSSProperties;
  editable?: boolean;
  defaultEditMode?: boolean;
  type?: "phone" | "address" | "text" | "description" | "iban";
  onStartEdit?: (key: string, value: any) => void;
  onValidate?: (key: string, value: any) => void;
}

const Field: React.FC<Props> = ({
  value,
  label,
  name,
  editable = true,
  defaultEditMode,
  style,
  type = "text",
  onStartEdit,
  onValidate,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  const [editMode, setEditMode] = useState(
    defaultEditMode ? defaultEditMode : false
  );
  const [inputValue, setValue] = useState(value);
  const stripe = useStripe();
  const elements = useElements();

  // async function handleChangeIban(event) {
  //   event.preventDefault();
  //
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //
  //   const ibanElement = elements.getElement(IbanElement);
  //
  //   const payload = await stripe.createToken(ibanElement, )
  //
  //   stripe.createToken(ibanElement);
  // }

  const handleClickEditBtn = () => {
    setEditMode(!editMode);
    if (editMode === true) {
      onValidate && onValidate(name, inputValue);
    } else {
      onStartEdit && onStartEdit(name, inputValue);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  let inputComponent;
  switch (type) {
    case "description":
      inputComponent = (
        <TextArea
          key={"1"}
          value={inputValue}
          name={name}
          onChange={handleChange}
          rows={4}
        />
      );
      break;
    case "iban":
      inputComponent = <IbanElement></IbanElement>;
      break;
    case "text":
    default:
      inputComponent = (
        <Input
          key={"1"}
          name={name}
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
