import cn from 'classnames';

const bounceClass = cn('bg-dark absolute top-0 left-0 w-full h-full rounded-full opacity-60');

export default function Loading() {
  return (
    <div className="pt-25 min-h-[300px] bg-white dark:bg-black">
      <div className="relative mx-auto h-20 w-20">
        <div className={cn(bounceClass, 'animate-loading-1')} />
        <div className={cn(bounceClass, 'animate-loading-2')} />
      </div>
    </div>
  );
}
