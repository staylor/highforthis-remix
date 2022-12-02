import cn from 'classnames';
import type { ReactNode } from 'react';

export default function TextTitle({
  className,
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      {...props}
      className={cn(
        'mb-2 block text-3xl font-semibold tracking-wide text-neutral-800 dark:text-white lg:mb-3',
        className
      )}
    >
      {children}
    </h2>
  );
}
