import React from 'react';
import { Anchor as AntAnchor } from 'antd';

export interface AnchorProps {
  affix?: boolean;
  bounds?: number;
  getContainer?: () => HTMLElement;
  offsetBottom?: number;
  offsetTop?: number;
  showInkInFixed?: boolean;
  onClick?: any;
  getCurrentAnchor?: () => string;
  targetOffset?: number;
  onChange?: (currentActiveLink: string) => void;
  style?: object;
}

export default function Anchor(props: AnchorProps) {
  //const {Link} = AntAnchor;

  return <AntAnchor {...props}></AntAnchor>;
}
