/* eslint-disable jsx-a11y/anchor-has-content */
import type { SyntheticEvent } from 'react';
import { Fragment, useState } from 'react';
import cn from 'classnames';
import NavLink from './NavLink';
import SubNav from './SubNav';
import CollapseButton from './CollapseButton';
import useRouteConfig from './useRouteConfig';

const Separator = () => <i className="mb-1.5 block h-1.5" />;

function NavMenu({ isCollapsed, toggleCollapse }: any) {
  const routeConfig = useRouteConfig();
  const [active, setActive] = useState('');

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();

    toggleCollapse();
  };

  const mouseEnter = (key: string) => {
    setActive(key);
  };

  const mouseLeave = () => {
    setActive('');
  };

  let k = 0;

  return (
    <nav
      className={cn('-bottom-30 fixed left-0 top-0 z-40 h-full w-9 bg-zinc-50', {
        'w-40': !isCollapsed,
        'w-9': isCollapsed,
      })}
    >
      {routeConfig.map((items: any, i: number) => (
        <Fragment key={`${i.toString(16)}`}>
          {k > 0 && <Separator />}
          {items.map((item: any, j: number) => {
            if (!item.label) {
              return null;
            }

            k += 1;
            const key = `${i}-${j}`;
            const isActive = active === key;
            const hasSubNav = item.routes && item.routes.length > 0;
            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => mouseEnter(key)}
                onMouseLeave={mouseLeave}
              >
                <NavLink
                  item={item}
                  isHovered={isActive}
                  hasSubNav={hasSubNav}
                  isCollapsed={isCollapsed}
                />
                {item.routes && (
                  <SubNav item={item} isHovered={isActive} isCollapsed={isCollapsed} />
                )}
              </div>
            );
          })}
        </Fragment>
      ))}
      <Separator />
      <CollapseButton onClick={onClick} isCollapsed={isCollapsed} />
    </nav>
  );
}

export default NavMenu;
