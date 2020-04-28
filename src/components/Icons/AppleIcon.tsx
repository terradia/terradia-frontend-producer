import React from 'react';

import { ReactComponent as AppleLogo } from '../../assets/Icon/company/apple.svg';
import SvgContainer from './SvgContainer';

interface FacebookIconProps {
  style?: React.CSSProperties;
}

const AppleIcon: React.FC<FacebookIconProps> = props => {
  return (
    <SvgContainer style={props.style}>
      <AppleLogo style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </SvgContainer>
  );
};

export default AppleIcon;
