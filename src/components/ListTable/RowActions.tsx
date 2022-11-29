import { Fragment } from 'react';

import Link from '@/components/Link';

export default function RowActions({ actions }: any) {
  const lastIndex = actions.length - 1;
  return (
    <nav className="text-sm">
      {actions.map((action: any, i: number) => {
        const { type, url, label, ...props } = action;
        let elem;
        switch (type) {
          case 'edit':
            elem = <Link to={url}>{label || 'Edit'}</Link>;
            break;
          case 'view':
            elem = <a href={url}>{label || 'View'}</a>;
            break;
          case 'delete':
            elem = (
              <a className="text-pink" href={url} {...props}>
                {label || 'Delete'}
              </a>
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
