/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import cn from 'classnames';

export default function TextTitle({ className, ...props }: any) {
  return (
    <h2
      {...props}
      className={cn(
        'mb-2 block text-3xl font-semibold tracking-wide text-neutral-800 dark:text-white lg:mb-3'
      )}
    />
  );
}
