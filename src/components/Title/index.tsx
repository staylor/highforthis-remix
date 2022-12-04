import cn from 'classnames';
import type { HTMLAttributes } from 'react';

import Heading from '../Heading';

export default function Title({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <Heading as="h1" {...props} className={cn('text-3xl lg:text-4xl', className)} />;
}
