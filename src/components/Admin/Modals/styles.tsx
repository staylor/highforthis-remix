import cn from 'classnames';

export const modalClass = cn('bg-white border-2 border-dark fixed inset-[10%] p-7 z-top');

export const frameClass = cn(
  'top-7.5 right-10 bottom-10 left-7.5 overflow-auto absolute after:clear-both after:table'
);

export const itemTitleClass = cn('block text-sm overflow-hidden text-ellipsis whitespace-nowrap');

export const CloseButton = ({ className, ...props }: any) => (
  <i
    {...props}
    className={cn(
      className,
      'z-close text-dark absolute right-2.5 top-2.5 block h-5 w-5 cursor-pointer text-xl'
    )}
  />
);
