import cn from 'classnames';
import type { ReactNode } from 'react';
import { Children } from 'react';

import Link from '@/components/Link';
import { usePath } from './ListTable/utils';

export const Heading = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
}) => (
  <h1
    {...props}
    className={cn(
      'font-stylized mr-2 mb-4 inline-block pt-2 pb-1 text-2xl font-normal tracking-wide',
      className
    )}
  >
    {children}
  </h1>
);

export const HeaderAdd = ({ label, to, ...props }: { label: string; to?: string }) => {
  const path = usePath();
  return (
    <Link
      className={cn(
        'relative z-10 cursor-pointer bg-[#ededed] py-1 px-2 font-bold outline-0',
        'border-detail -top-0.75 rounded-sm border text-sm'
      )}
      to={to || `${path}/add`}
      {...props}
    >
      Add {label}
    </Link>
  );
};

export const FormWrap = ({ className, ...props }: { className?: string }) => (
  <div {...props} className={cn('block after:clear-both after:table', className)} />
);
