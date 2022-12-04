import cn from 'classnames';
import type { PropsWithChildren } from 'react';

export const headingBase =
  'block font-stylized font-semibold mb-2 lg:mb-3 tracking-wide text-neutral-800 dark:text-white';

export const heading2 = 'text-2xl';

export const heading3 =
  'border-pink inline-block border-b-2 border-dashed mt-6 py-1 pl-0.5 pr-6 text-2xl';

export const heading4 = 'text-lg';

type HeadingProps = PropsWithChildren<{
  as: any;
  className?: string;
}>;

export default function Heading({ as: Component, className, children }: HeadingProps) {
  return <Component className={cn(headingBase, className)}>{children}</Component>;
}
