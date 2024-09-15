import {CartIconProps} from "@/app/types";


export default function CartIcon({classes, strokeWidth}: CartIconProps) {
  return (
      <svg className={classes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
           strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
  );
}
