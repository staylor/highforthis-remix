import { useReducer } from 'react';
import cn from 'classnames';
import { useSearchParams, useParams } from '@remix-run/react';

import Link from '@/components/Link';
import Select from '@/components/Form/Select';
import Checkbox from '@/components/Form/Checkbox';
import { uploadUrl } from '@/utils/media';

export { default as RowTitle } from './RowTitle';
export { default as RowActions } from './RowActions';

const reducer = (a: any, b: any) => ({ ...a, ...b });

export const renderThumbnail = (media: any, field: any) => {
  if (!media[field] || !media[field].length) {
    return null;
  }
  const sorted = [...media[field]];
  sorted.sort((a, b) => a.width - b.width);
  return <img className="w-16" src={uploadUrl(media.destination, sorted[0].fileName)} alt="" />;
};

const formatDate = (date: any) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const min = d.getMinutes();
  const hour = d.getHours();
  return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${d.getFullYear()}
  ${' '}at${' '}
  ${hour % 12}:${min < 10 ? `0${min}` : min}${hour < 12 ? 'am' : 'pm'}`;
};

const Count = ({ children }: any) => (
  <strong className="mx-1 inline-block select-none px-2 text-center font-normal">{children}</strong>
);

const cellHeading = cn('text-sm py-2 px-2.5 text-left');

const Headers = ({ className, checkClass, columns, checked, toggleAll }: any) => (
  <tr>
    <th className={cn(cellHeading, className, 'w-9', checkClass)}>
      <Checkbox checked={checked} onChange={toggleAll} />
    </th>
    {columns.map((column: any, i: number) => (
      <th className={cn(cellHeading, className, column.className)} key={`${i.toString(16)}`}>
        {column.label}
      </th>
    ))}
  </tr>
);

function ListTable(props: any) {
  const { data = {}, onDelete = () => null, path, columns, filters, perPage = 20 } = props;
  const [searchParams] = useSearchParams();
  const params = useParams();
  const [state, setState] = useReducer(reducer, {
    checked: [],
    all: false,
  });

  const bulkAction = (value: any, e: any) => {
    if (value === 'deleteAll' && state.checked.length) {
      const action = onDelete(state.checked);
      action(e);
    }
  };

  const toggleAll = (checked: any) => {
    let ids;
    if (checked) {
      ids = data.edges.map(({ node }: any) => node.id);
    } else {
      ids = [];
    }
    setState({ checked: ids, all: checked });
  };

  const toggleCheck = (checked: any, id = null) => {
    if (!id) {
      return;
    }

    const ids = [...state.checked];
    let { all } = state;
    if (checked) {
      ids.push(id);
    } else {
      all = false;
      ids.splice(ids.indexOf(id), 1);
    }

    setState({ checked: ids, all });
  };

  if (!data || !data.edges || !data.edges.length) {
    return <p className="my-10">No items found.</p>;
  }

  const LinkTo = ({ to = '', className, children }: any) => (
    <Link className={className} to={{ pathname: `${path}${to}`, search: searchParams.toString() }}>
      {children}
    </Link>
  );

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

  const textClass = cn(
    'border border-detail',
    'inline-block text-base leading-none font-normal mx-0.5 pt-0.5 px-1.5 pb-1 rounded-sm text-center select-none'
  );

  const Inactive = (p: any) => <span className={cn(textClass, 'bg-neutral-50')} {...p} />;
  const Active = (p: any) => (
    <LinkTo
      className={cn(textClass, 'text-dark hover:bg-detail bg-white hover:text-black')}
      {...p}
    />
  );

  const paginationMatrix = (
    <nav className="float-right select-none text-sm">
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

  return (
    <>
      <section className="my-1.5 overflow-hidden">
        {onDelete && (
          <Select
            key="bulk"
            placeholder="Bulk Actions"
            choices={[{ label: 'Delete', value: 'deleteAll' }]}
            onChange={bulkAction}
          />
        )}
        {filters}
        {paginationMatrix}
      </section>
      <table className="border-detail w-full table-fixed border-spacing-0 border shadow">
        <thead>
          <Headers
            className="border-detail border-b"
            checkClass="border-b border-detail"
            columns={columns}
            checked={state.all}
            toggleAll={toggleAll}
          />
        </thead>
        <tbody>
          {data.edges.map(({ node }: any) => (
            <tr className="even:bg-neutral-50" key={node.id}>
              <th className={cn(cellHeading, 'py-1.5 px-2.5 align-top')}>
                <Checkbox
                  className="align-text-top"
                  checked={state.checked.includes(node.id)}
                  id={node.id}
                  onChange={toggleCheck}
                />
              </th>
              {columns.map((column: any, i: number) => {
                let content = null;
                if (column.type && column.type === 'date') {
                  content = node[column.prop] ? formatDate(node[column.prop]) : null;
                } else {
                  content = column.render ? column.render(node, props) : node[column.prop];
                }
                return (
                  <td
                    key={`${i.toString(16)}`}
                    className={cn('break-words py-2 px-2.5 align-top text-sm', column.className)}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <Headers
            className="border-detail border-t"
            checkClass="border-t border-detail"
            columns={columns}
            checked={state.all}
            toggleAll={toggleAll}
          />
        </tfoot>
      </table>
      <section className="my-1.5 overflow-hidden">{paginationMatrix}</section>
    </>
  );
}

export default ListTable;
