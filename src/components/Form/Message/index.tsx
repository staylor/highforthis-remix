import cn from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */

export default function Message({ text }: any) {
  return (
    <div
      className={cn(
        'border-pink border-l-4 bg-neutral-50 shadow-sm',
        'relative mb-4 mt-1 block py-px pr-9 pl-3'
      )}
    >
      <p className="text-dark my-2 p-0.5 text-sm">{text}</p>
      <button
        type="button"
        className={cn(
          'm-0 cursor-pointer border-none bg-none p-2',
          'absolute right-1 top-0',
          'dashicons-before before:content-dismiss before:text-base',
          'before:block before:h-5 before:w-5 before:bg-none'
        )}
      />
    </div>
  );
}
