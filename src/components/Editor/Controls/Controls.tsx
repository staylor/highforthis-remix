import cn from 'classnames';

const Controls = ({ className, ...props }: any) => (
  <div className={cn('relative block h-8 w-auto select-none text-sm', className)} {...props} />
);

export default Controls;
