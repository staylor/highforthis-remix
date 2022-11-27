import cn from 'classnames';

import Title from '@/components/Title';

export default function PostTitle({ className, ...props }: any) {
  return <Title {...props} className={cn('border-pink border-l-8 py-2 pl-2.5', className)} />;
}
