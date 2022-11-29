import React, { useReducer } from 'react';
import cn from 'classnames';
import { useSubmit } from '@remix-run/react';

import Select from '@/components/Form/Select';
import Checkbox from '@/components/Form/Checkbox';
import { uploadUrl } from '@/utils/media';

import Pagination from './Pagination';

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
  const { data = {}, deletable = false, path, columns, filters, perPage = 20 } = props;
  const submit = useSubmit();
  const [state, setState] = useReducer(reducer, {
    checked: [],
    all: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (e.currentTarget.bulkActions.value === 'deleteAll') {
      submit(e.currentTarget, { method: 'delete' });
    }
  }

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

  const paginationMatrix = (
    <Pagination data={data} path={path} perPage={perPage} className="align-right" />
  );
  const toolbarClass = cn('flex items-center');

  return (
    <>
      <section className={cn(toolbarClass, 'my-1.5')}>
        <div className="flex grow">
          {deletable && (
            <form method="delete" onChange={handleChange}>
              {state.checked.map((id: string) => (
                <input key={id} type="hidden" name="ids" value={id} />
              ))}
              <Select
                key="bulk"
                name="bulkActions"
                placeholder="Bulk Actions"
                choices={[{ label: 'Delete', value: 'deleteAll' }]}
              />
            </form>
          )}
          {filters}
        </div>
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
      <section className={cn(toolbarClass, 'my-4 justify-end')}>{paginationMatrix}</section>
    </>
  );
}

export default ListTable;
