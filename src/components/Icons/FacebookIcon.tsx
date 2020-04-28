import React from 'react';
import { ReactComponent as FacebookLogo } from '../../assets/Icon/company/facebook.svg';
import SvgContainer from './SvgContainer';

interface FacebookIconProps {
  style?: React.CSSProperties;
}

const FacebookIcon = (props: FacebookIconProps) => {
  return (
    <SvgContainer style={props.style}>
      <FacebookLogo style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </SvgContainer>
  );
};

export default FacebookIcon;
