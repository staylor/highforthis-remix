import { Link } from '@remix-run/react';
import type { SyntheticEvent } from 'react';

export default function CustomLink(props: any) {
  const onClick = (e: SyntheticEvent) => {
    if (props.onClick) {
      props.onClick(e);
    }

    if (!e.defaultPrevented) {
      document.documentElement.scrollTop = 0;
    }
  };

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <Link {...props} onClick={onClick} />;
}
