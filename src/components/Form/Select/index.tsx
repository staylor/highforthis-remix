import cn from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

import { inputBase } from '@/components/Form/styles';

type Choice = string | number | { label: string; value: string | number };
type Group = { label: string; choices: Choice[] };

type Props = {
  name?: string;
  className?: string | null;
  multiple?: boolean | string | number;
  value?: any;
  placeholder?: string;
  choices?: Choice[];
  groups?: Group[];
  children?: ReactNode;
};

const renderOption = (choice: any) => {
  if (typeof choice === 'object') {
    return (
      <option key={choice.value} value={choice.value}>
        {choice.label}
      </option>
    );
  }
  return (
    <option key={choice} value={choice}>
      {choice}
    </option>
  );
};

export default function Select({
  className,
  placeholder,
  multiple: multipleProp = false,
  choices,
  groups,
  children = null,
  value = null,
  ...rest
}: Props) {
  return (
    <select
      {...rest}
      defaultValue={value}
      multiple={multipleProp ? Boolean(multipleProp) : false}
      className={cn(inputBase, className)}
    >
      {placeholder && (
        <option key={placeholder} value="">
          {placeholder}
        </option>
      )}
      {groups &&
        groups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.choices.map(renderOption)}
          </optgroup>
        ))}
      {choices && choices.map(renderOption)}
      {children}
    </select>
  );
}
