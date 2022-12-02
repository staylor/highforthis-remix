import cn from 'classnames';

export default function TextTitle({ className, children, ...props }: any) {
  return (
    <h2
      {...props}
      className={cn(
        'mb-2 block text-3xl font-semibold tracking-wide text-neutral-800 dark:text-white lg:mb-3',
        className
      )}
    >
      {children}
    </h2>
  );
}
