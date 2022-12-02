import React from 'react';
import cn from 'classnames';
import { inputBase } from '@/components/Form/styles';

export default function Textarea({ onChange, className, value, ...props }: any) {
  const inputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value || '';
    onChange(newValue);
  };
  return (
    <textarea
      {...props}
      onChange={onChange ? inputOnChange : undefined}
      className={cn(inputBase, 'w-full', className)}
      defaultValue={value}
    />
  );
}
