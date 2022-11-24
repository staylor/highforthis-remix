import cn from 'classnames';

export default function Divider({ className, children }: any) {
  return (
    <div
      className={cn(
        'border-detail mt-6 block border-t pt-6 md:mt-0 md:border-0 md:pt-0',
        className
      )}
    >
      {children}
    </div>
  );
}
