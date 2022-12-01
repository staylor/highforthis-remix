import cn from 'classnames';

export default function BlockButton({ active, ref, onMouseDown }: any) {
  return (
    <div
      className={cn(
        'text-detail hover:text-detail-dark text-2xl',
        '-left-7.5 absolute block scale-0 cursor-pointer transition-transform',
        'dashicons',
        {
          'dashicons-plus-alt': !active,
          'dashicons-no': active,
        }
      )}
      ref={ref}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();

        onMouseDown();
      }}
    >
      {' '}
    </div>
  );
}
