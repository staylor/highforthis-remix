import { Link } from '@remix-run/react';
import type { SyntheticEvent } from 'react';

export default function CustomLink({ onClick: onClickProp, children, ...props }: any) {
  const onClick = (e: SyntheticEvent) => {
    if (onClickProp) {
      onClickProp(e);
    }

    if (!e.defaultPrevented) {
      document.documentElement.scrollTop = 0;
    }
  };

  return (
    <Link {...props} onClick={onClick}>
      {children}
    </Link>
  );
}
