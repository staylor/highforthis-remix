import { useState } from 'react';
import cn from 'classnames';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { gql } from '@apollo/client';

import NavMenu from '@/components/Admin/NavMenu';
import titleTemplate from '@/utils/title';
import query from '@/utils/query';

export const handle = {
  layout: 'admin',
};

export const meta: MetaFunction = ({ parentsData }) => {
  const { settings } = parentsData.root;
  return {
    title: titleTemplate({ title: 'Admin', settings }),
  };
};

export const loader: LoaderFunction = ({ context }) => {
  return query({ context, query: adminQuery });
};

export default function Admin() {
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    <div className="mx-auto min-h-[calc(100vh-48px)] bg-white py-6 px-12">
      <section>
        <div id="portal" />
        <div className="absolute" id="atomicToolbar" />
        <NavMenu toggleCollapse={() => setCollapsed(!isCollapsed)} isCollapsed={isCollapsed} />
        <section
          className={cn('relative z-30 ml-9 h-full px-5 pb-16 lg:ml-0', {
            'lg:ml-40': !isCollapsed,
            'lg:ml-9': isCollapsed,
          })}
        >
          <Outlet />
        </section>
      </section>
    </div>
  );
}

const adminQuery = gql`
  query AdminQuery {
    taxonomies @cache(key: "admin") {
      edges {
        node {
          id
          name
          plural
          slug
        }
      }
    }
  }
`;
