import cn from 'classnames';
import { useLocation, NavLink } from '@remix-run/react';

function SubNav({ isHovered, isCollapsed, item }: any) {
  const location = useLocation();
  const adminPath = item.path === '/' ? '/admin' : `/admin${item.path}`;
  const active = location.pathname.indexOf(adminPath) === 0;

  const flyout = isCollapsed ? isHovered : isHovered && !active;
  const isHidden = isCollapsed ? !flyout : !isHovered && !active;
  return (
    <nav
      className={cn('left-9 bg-white py-2', isHidden ? 'hidden' : 'block', {
        'lg:left-9': isCollapsed,
        'lg:left-40': !isCollapsed,
        'z-top bg-dark min-w-nav absolute top-0 block w-auto shadow-md': flyout,
      })}
    >
      {item.routes.map((route: any) => {
        const itemPath = `/admin${route.path}`;
        const isRoute = location.pathname === itemPath;
        const className = cn(
          'block text-[13px] tracking-wide no-underline py-1 px-3',
          // these colors can't co-exist
          flyout
            ? 'text-white visited:text-white'
            : active
            ? 'text-black hover:text-black active:text-black'
            : 'text-dark',
          {
            'font-bold': active && isRoute,
            'hover:text-pink active:text-pink': !isRoute || flyout,
          }
        );
        return (
          <NavLink className={className} key={itemPath} to={itemPath}>
            {route.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default SubNav;
