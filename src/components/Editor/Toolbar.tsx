/* eslint-disable react/prop-types */

import { forwardRef } from 'react';
import cn from 'classnames';

const Toolbar = forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cn(
      'bg-white absolute scale-0 z-10 transition-transform shadow-lg rounded',
      'after:border-l-1.5 after:border-transparent after:border-t-white',
      'after:absolute after:h-0 after:w-0 after:pointer-events-none after:right-1/2 after:-bottom-3',
      'after:[&.Toolbar-flush]:border-t-transparent',
      className
    )}
  />
));

export default Toolbar;
