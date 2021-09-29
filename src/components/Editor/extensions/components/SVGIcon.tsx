import * as React from 'react';

import {styled} from 'baseui';

const SVGwarper = styled<{}, 'svg'> ('svg', () => ({
  fill: 'currentcolor',
  width: '24px',
  height: '24px',
}));

interface ISVGIconProps {
  href: string;
  color?: string;
}

export const SVGIcon:React.FC<ISVGIconProps> = (props) => {
  return (
    <SVGwarper>
      <use href={props.href} />
    </SVGwarper>
  )
}