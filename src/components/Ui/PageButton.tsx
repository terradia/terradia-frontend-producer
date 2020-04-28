import React from 'react';
import { Menu } from 'antd';

const textStyle = {
  fontFamily: 'Montserrat',
  fontWeight: 600,
  fontSize: 'larger',
  color: '#BBBBBB',
};

declare interface PageButtonProps {
  link: string;
  label: string;
  icon: React.ReactNode;
  onClick: (href: string) => void;
}

const PageButton = ({
                      link,
                      icon,
                      label,
                      onClick,
                      ...props
                    }: PageButtonProps) => {

  return (
    <Menu.Item key={link} onClick={() => onClick(link)} style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '16',
    }} {...props}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}>
        {icon}
        <span style={textStyle}>
                {label}
            </span>
      </div>

    </Menu.Item>
  );
};

export default PageButton;