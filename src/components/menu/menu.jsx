import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as MenuChevronDown } from '../../img/icon/chevron-for-menu-down.svg';
import { ReactComponent as MenuChevronUp } from '../../img/icon/chevron-for-menu-up.svg';
import { useAppSelector } from '../../redux/hooks';
import { getCategoriesState } from '../../redux/selectors';
import { ListLink } from '../list-link';

import './menu.css';

export const Menu = ({ menuTitile, menuTitileActive, test1, test3, test4, test5, test6 }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCategory, setVisibleCategory] = useState(true);
  const { pathname } = useLocation();
  const categories = useAppSelector(getCategoriesState);

  useEffect(() => {
    if (pathname.includes('books')) {
      const splittedPathname = pathname.split('/');

      setActiveCategory(splittedPathname[splittedPathname.length - 1]);
    } else {
      setActiveCategory(pathname.slice(1, pathname.length));
    }
  }, [pathname]);

  return (
    <div className='menu'>
      <div className='book-list-in-menu'>
        {activeCategory === 'rules' || activeCategory === 'contract' ? (
          <Link
            data-test-id={test1}
            onClick={() => {
              setVisibleCategory(!visibleCategory);
            }}
            to='/books/all'
          >
            <h5 ref={menuTitileActive} className='first-category-title'>
              Витрина книг
            </h5>
          </Link>
        ) : (
          <Link
            to=''
            data-test-id={test1}
            onClick={(event) => {
              event.preventDefault();
              setVisibleCategory(!visibleCategory);
            }}
          >
            <h5 ref={menuTitile} className='first-category-title-active'>
              Витрина книг<span>{visibleCategory ? <MenuChevronUp /> : <MenuChevronDown />} </span>
            </h5>
          </Link>
        )}

        <ul>
          <li className={activeCategory === 'all' ? 'category-active' : 'category'}>
            <Link className={visibleCategory ? '' : 'for-never-tests'} to='books/all'>
              <div className={activeCategory === 'all' ? 'active-list-category-title' : 'list-category-title'}>
                {categories.content && <h5 data-test-id={`${test5}books`}>Все книги</h5>}
              </div>
            </Link>
          </li>
          {categories.content?.map((item) => (
            <ListLink
              {...item}
              visible={visibleCategory === true}
              active={item.path === activeCategory}
              key={item.path}
              test5={test5}
              test6={test6}
            />
          ))}
        </ul>
      </div>
      <div>
        <Link
          data-test-id={test3}
          to='/rules'
          onClick={() => {
            setVisibleCategory(false);
          }}
        >
          <h5 className={activeCategory === 'rules' ? 'category-title-active' : 'category-title'}>
            Правила пользования
          </h5>
        </Link>
      </div>
      <div>
        <Link
          data-test-id={test4}
          to='/contract'
          onClick={() => {
            setVisibleCategory(false);
          }}
        >
          <h5 className={activeCategory === 'contract' ? 'category-title-active' : 'category-title'}>Договор оферты</h5>
        </Link>
      </div>
    </div>
  );
};
