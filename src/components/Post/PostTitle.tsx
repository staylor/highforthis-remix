import cn from 'classnames';

import Title from '@/components/Title';
import type { ReactNode } from 'react';

export default function PostTitle({
  className,
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Title {...props} className={cn('border-pink border-l-8 py-2 pl-2.5', className)}>
      {children}
    </Title>
  );
}
