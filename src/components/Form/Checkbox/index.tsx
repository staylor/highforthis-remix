import React, { useState } from 'react';
import cn from 'classnames';

export default function Checkbox({ checked = false, onChange, id, className, ...props }: any) {
  const [isChecked, setChecked] = useState(checked ? Boolean(checked) : false);

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Boolean(e.target.checked);
    setChecked(value);
    if (onChange) {
      onChange(value, id || null);
    }
  };

  return (
    <input
      {...props}
      className={cn(
        'text-pink focus:border-pink focus:ring-pink rounded border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-offset-0',
        className
      )}
      type="checkbox"
      onChange={inputOnChange}
      checked={isChecked}
    />
  );
}
