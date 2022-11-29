/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
import cn from 'classnames';

import Link from '@/components/Link';

export const Heading = ({ className, ...props }: any) => (
  <h1
    {...props}
    className={cn(
      'font-stylized mr-2 mb-4 inline-block pt-2 pb-1 text-2xl font-normal tracking-wide',
      className
    )}
  />
);

export const HeaderAdd = (props: any) => (
  <Link
    className={cn(
      'relative z-10 cursor-pointer bg-[#ededed] py-1 px-2 font-bold outline-0',
      'border-detail -top-0.75 rounded-sm border text-sm'
    )}
    {...props}
  />
);

export const FormWrap = ({ className, ...props }: any) => (
  <div {...props} className={cn('block after:clear-both after:table', className)} />
);
