import React, { Fragment } from 'react';
import cn from 'classnames';
import { useSubmit } from '@remix-run/react';

import Link from '@/components/Link';

export default function RowActions({ actions }: any) {
  const submit = useSubmit();
  const lastIndex = actions.length - 1;
  const linkClass = cn('hover:underline');
  return (
    <nav className="text-sm">
      {actions.map((action: any, i: number) => {
        const { type, url, label, ...props } = action;
        let elem;
        switch (type) {
          case 'edit':
            elem = (
              <Link className={linkClass} to={url}>
                {label || 'Edit'}
              </Link>
            );
            break;
          case 'view':
            elem = (
              <a className={linkClass} href={url} target="_blank" rel="noreferrer">
                {label || 'View'}
              </a>
            );
            break;
          case 'delete':
            elem = (
              <form
                method="delete"
                className="inline"
                onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                  e.preventDefault();

                  submit(e.currentTarget, { method: 'delete' });
                }}
              >
                {action.ids.map((id: string) => (
                  <input key={id} type="hidden" name="ids" value={id} />
                ))}
                <button type="submit" className={cn(linkClass, 'text-pink')} href={url} {...props}>
                  {label || 'Delete'}
                </button>
              </form>
            );
            break;
          default:
            elem = null;
            break;
        }

        return (
          <Fragment key={`${type}-${url}`}>
            {elem}
            {i < lastIndex && ' | '}
          </Fragment>
        );
      })}
    </nav>
  );
}
