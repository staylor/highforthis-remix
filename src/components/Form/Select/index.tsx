import cn from 'classnames';
import type { ReactNode, SyntheticEvent } from 'react';
import React from 'react';

import { inputBase } from '@/components/Form/styles';

type Choice = string | number | { label: string; value: string | number };
type Choices = Array<Choice>;
type Groups = Array<{ label: string; choices: Choices }>;

type Props = {
  className?: string | null;
  multiple?: boolean | string | number;
  onChange?: (value: any, e?: SyntheticEvent) => any;
  bindRef?: (element: any) => void;
  value?: string | number | Array<string | number> | null;
  placeholder?: string;
  choices?: Choices;
  groups?: Groups;
  controlled?: Boolean;
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
  onChange: onChangeProp = () => null,
  bindRef = () => null,
  controlled,
  ...rest
}: Props) {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let val: any = e.target.value;
    const multiple = Boolean(multipleProp);
    if (multiple) {
      val = [...e.target.selectedOptions].map((o) => o.value);
    }
    if (onChangeProp) {
      onChangeProp(val, e);
    }
  };

  let valueProp: any = { defaultValue: value };
  if (controlled === false) {
    valueProp = { value };
  }

  return (
    <select
      {...rest}
      {...valueProp}
      ref={bindRef}
      multiple={multipleProp ? Boolean(multipleProp) : false}
      className={cn(inputBase, className)}
      onChange={onChange}
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
