import cn from 'classnames';
import { NavLink, useLocation, useNavigate, type Location } from '@remix-run/react';

import Select from '@/components/Form/Select';

const year = new Date().getFullYear() + 1;
const yearChoices = (start: number, end: number) =>
  [...Array(end - start).keys()].map((i) => start + i);

const isActive = (path: string, location: Location) => {
  if (path === location.pathname) {
    return true;
  }
  if (path === '/') {
    return false;
  }
  const initial = `/${location.pathname.split('/')[1]}`;
  if (initial === '/') {
    return false;
  }
  return path.indexOf(initial) === 0;
};

const Link = ({ to, children = null, exact = false }: any) => {
  const location = useLocation();
  const active = isActive(to, location);
  const className = cn(
    'font-stylized text-base xs:text-xl sm:text-2xl md:text-3xl align-middle inline-block',
    'my-1 mx-1 xs:mx-1.5 md:mx-2.5 first:ml-0 last:mr-0 md:my-0 md:ml-0 md:mr-5',
    {
      'text-pink dark:text-pink': active,
      'text-gray-400 dark:text-gray-400': !active,
    }
  );

  return (
    <NavLink className={className} to={to}>
      {children}
    </NavLink>
  );
};

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (value: string) => {
    navigate({
      pathname: `/videos/${value}`,
    });
  };
  const showYears = location.pathname === '/' || location.pathname.match(/^\/video/);
  return (
    <nav
      className={cn(
        'mx-auto mt-2 mb-3 text-center md:my-3 lg:mx-0 lg:mt-0 lg:text-left',
        'md:flex md:items-center md:justify-start lg:h-12'
      )}
    >
      <Link to="/" exact>
        Home
      </Link>
      <Link to="/podcast" exact>
        Podcast
      </Link>
      <Link to="/shows">Shows</Link>
      <Link to="/videos">Videos</Link>
      {showYears && (
        <Select
          value=""
          className="dark:text-dark my-0 mx-auto md:mx-0"
          placeholder="-- Videos By Year --"
          choices={yearChoices(2011, year).reverse()}
          onChange={onChange}
        />
      )}
    </nav>
  );
};

export default Navigation;
