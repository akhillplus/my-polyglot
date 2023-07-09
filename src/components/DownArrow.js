import React from 'react';
import { css } from 'emotion'; 

const Svg = ({ size, ...props }) => (
    <svg
      height={size}
      width={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      className={css({
        display: 'inline-block',
        fill: 'currentColor',
        lineHeight: 1,
        stroke: 'currentColor',
        strokeWidth: 0,
      })}
      {...props}
    />
  );
   
const DownArrow = (props) => (
    <Svg size={20} {...props}>
    <path d="M7 10l5 5 5-5z"></path>  
    </Svg> 
  );
  
const CustomArrow = ({ innerProps/*, isDisabled */}) =>
(
//    <div {...innerProps}>
  <DownArrow  {...innerProps} style={{color: 'rgba(0, 0, 0, 0.54)'}} />
//    </div>
  ); 

export default CustomArrow;
