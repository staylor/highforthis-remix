import React from 'react';
import cn from 'classnames';

import { inputBase } from '@/components/Form/styles';

export default function Input({ inputType, value, onChange, className, ...props }: any) {
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value || '';
    onChange(newValue);
  };

  return (
    <input
      type={inputType || 'text'}
      {...props}
      onChange={onChange ? inputOnChange : undefined}
      className={cn(inputBase, 'w-full', className)}
      defaultValue={value}
    />
  );
}
