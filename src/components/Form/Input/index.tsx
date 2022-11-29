import cn from 'classnames';

import { inputBase } from '@/components/Form/styles';

export default function Input({ inputType, value, onChange, className, ...props }: any) {
  return (
    <input
      type={inputType || 'text'}
      {...props}
      className={cn(inputBase, 'w-full', className)}
      defaultValue={value}
    />
  );
}
