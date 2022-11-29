import React from 'react';
import cn from 'classnames';
import { inputBase } from '@/components/Form/styles';

export default function Textarea({ className, value, ...props }: any) {
  return (
    <textarea {...props} className={cn(inputBase, 'w-full', className)} defaultValue={value} />
  );
}
