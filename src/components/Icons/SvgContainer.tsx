import React from 'react';

interface SvgContainerProps {
  children: any;
  style?: React.CSSProperties;
}

const SvgContainer: React.FC<SvgContainerProps> = props => {
  const defaultStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <span
      className={"svg-container"}
      style={{
        ...props.style,
        ...defaultStyle,
      }}
    >
      {props.children}
    </span>
  );
};

export default SvgContainer;
