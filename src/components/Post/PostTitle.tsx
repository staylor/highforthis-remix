import cn from 'classnames';
import type { HTMLAttributes } from 'react';

import Title from '@/components/Title';

export default function PostTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <Title {...props} className={cn('border-pink border-l-8 py-2 pl-2.5', className)} />;
}
