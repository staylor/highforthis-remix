import cn from 'classnames';
import type { ReactNode } from 'react';

export const blockquoteBase =
  'font-georgia text-[#666] border-l-4 border-detail italic my-4 py-2.5 px-5';

const Blockquote = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
}) => (
  <blockquote className={cn(blockquoteBase, className)} {...props}>
    {children}
  </blockquote>
);

export default Blockquote;
