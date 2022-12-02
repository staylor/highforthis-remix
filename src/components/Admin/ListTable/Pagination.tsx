import type { ReactNode } from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from '@remix-run/react';
import type { AppData } from '@remix-run/node';

import Link from '@/components/Link';

const textClass = cn(
  'border border-detail',
  'inline-block text-base leading-none font-normal mx-0.5 pt-0.5 px-1.5 pb-1 rounded-sm text-center select-none'
);

const Count = ({ children }: { children: ReactNode }) => (
  <strong className="mx-1 inline-block select-none px-2 text-center font-normal">{children}</strong>
);

interface PaginationProps {
  data: AppData;
  path: string;
  perPage: number;
  className: string;
}

export default function Pagination({ data, path, perPage, className }: PaginationProps) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const pages = data.count > 0 ? Math.ceil(data.count / perPage) : 0;
  const firstPage = pages === 0 ? 0 : 1;
  const currentPage = params.page ? parseInt(params.page, 10) : firstPage;
  const paginated = currentPage && currentPage > 1;
  let previousUrl = null;
  let nextUrl = null;
  if (paginated) {
    if (currentPage - 1 > 1) {
      previousUrl = `/page/${currentPage - 1}`;
    } else {
      previousUrl = '';
    }
  }
  if (currentPage !== pages && data.pageInfo.hasNextPage) {
    nextUrl = `/page/${currentPage + 1}`;
  }

  const LinkTo = ({ to = '', className, children }: any) => (
    <Link className={className} to={{ pathname: `${path}${to}`, search: searchParams.toString() }}>
      {children}
    </Link>
  );
  const Inactive = (p: any) => <span className={cn(textClass, 'bg-neutral-50')} {...p} />;
  const Active = (p: any) => (
    <LinkTo
      className={cn(textClass, 'text-dark hover:bg-detail bg-white hover:text-black')}
      {...p}
    />
  );

  return (
    <nav className={cn('select-none text-sm', className)}>
      <Count>{data.count} items</Count>
      {paginated ? <Active>«</Active> : <Inactive>«</Inactive>}
      {previousUrl === null ? <Inactive>‹</Inactive> : <Active to={previousUrl}>‹</Active>}
      <Count>
        {paginated ? currentPage : firstPage} of {pages}
      </Count>
      {nextUrl === null ? <Inactive>›</Inactive> : <Active to={nextUrl}>›</Active>}
      {currentPage !== pages ? <Active to={`/page/${pages}`}>»</Active> : <Inactive>»</Inactive>}
    </nav>
  );
}
