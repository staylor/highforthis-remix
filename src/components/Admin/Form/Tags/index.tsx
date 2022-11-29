import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import cn from 'classnames';

import Input from '@/components/Form/Input';

export default function Tags({ name, tags }: any) {
  const [pending, setPending] = useState(tags || []);

  const onKeyDown = (e: any) => {
    if (e.which === 13) {
      e.preventDefault();

      const newTags = [...pending];
      newTags.push(e.target.value);
      const unique = [...new Set(newTags)];
      setPending(unique);
    }
  };

  const bindClick = (index: number) => (e: SyntheticEvent) => {
    e.preventDefault();

    const newTags = [...pending];
    newTags.splice(index, 1);
    setPending(newTags);
  };

  return (
    <>
      <Input placeholder="Type tag then press ENTER" onKeyDown={onKeyDown} />
      <div className="my-1.5 overflow-auto text-xs">
        {pending.map((tag: string, i: number) => (
          <div
            className="float-left mr-1.5 max-w-full cursor-default overflow-hidden text-ellipsis text-sm"
            key={tag}
          >
            <input type="hidden" name={name} value="tag" />
            <button
              className={cn(
                'float-left h-5 w-6 cursor-pointer',
                'before:block before:rounded-full before:text-center before:antialiased',
                'dashicons-before before:h-5 before:w-5 before:text-base',
                'before:content-dismiss before:text-dark before:ml-0.5'
              )}
              onClick={bindClick(i)}
            />{' '}
            {tag}
          </div>
        ))}
      </div>
    </>
  );
}
