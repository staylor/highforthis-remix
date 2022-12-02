import cn from 'classnames';
import type { ReactNode } from 'react';

export const paragraphBase = 'mb-6';

const Paragraph = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
}) => (
  <p className={cn(paragraphBase, className)} {...props}>
    {children}
  </p>
);

export default Paragraph;
