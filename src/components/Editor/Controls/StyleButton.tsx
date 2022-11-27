import type { SyntheticEvent } from 'react';
import cn from 'classnames';

type Props = {
  style: string;
  onToggle: (prop: string) => void;
  className: string;
  active: boolean;
  label: any;
};

function StyleButton({ label, style, onToggle, className, active }: Props) {
  const onMouseDown = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(style);
  };

  return (
    <span
      role="button"
      tabIndex={-1}
      className={cn(
        'inline-block h-8 w-auto overflow-hidden px-1.5 leading-8',
        'hover:text-dark cursor-pointer first:rounded-l last:rounded-r',
        className,
        {
          'text-dark hover:text-pink': active,
        }
      )}
      onMouseDown={onMouseDown}
    >
      {label}
    </span>
  );
}

export default StyleButton;
