import React from 'react';

import { ReactComponent as AppleLogo } from '../../assets/Icon/company/apple.svg';
import SvgContainer from './SvgContainer';

interface AppleIconProps {
  style?: React.CSSProperties;
}

const AppleIcon = (props: AppleIconProps) => {
  return (
    <SvgContainer style={props.style}>
      <AppleLogo style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </SvgContainer>
  );
};

export default AppleIcon;
