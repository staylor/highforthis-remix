import cn from 'classnames';
import type { HTMLAttributes } from 'react';

const Wrapper = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mx-auto max-w-screen-xl bg-white p-6 dark:bg-black',
      'transition-colors duration-300 ease-linear',
      className
    )}
    {...props}
  />
);

export default Wrapper;
