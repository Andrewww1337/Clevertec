import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCategories } from '../../features/categories';
import { getUser } from '../../features/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCategoriesState } from '../../redux/selectors';
import { Menu } from '../menu';

import './burger-menu.css';

export const BurgerMenu = ({ activ, setActive }) => {
  const select = useRef(null);
  const menuTitileActive = useRef(null);
  const menuTitile = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategoriesState);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (categories.content === null) {
      if (jwt) {
        dispatch(getCategories('/api/categories'));
        dispatch(getUser());
      }
    }
  }, [dispatch, categories.content, jwt]);

  document.onclick = function (e) {
    if (e.target !== select.current) {
      setActive(false);
    }
  };

  return (
    <button
      ref={select}
      type='button'
      className={activ ? 'burger-menu active' : 'burger-menu'}
      onClick={(e) => {
        if (e.target !== menuTitile.current && e.target !== menuTitileActive.current) {
          setActive(false);
        }
      }}
    >
      <div className='menu-in-borger'>
        <Menu
          menuTitileActive={menuTitileActive}
          menuTitile={menuTitile}
          test1='burger-showcase'
          test2='burger-books'
          test3='burger-terms'
          test4='burger-contract'
          test5='burger-'
          test6='burger-book-count-for-'
        />
      </div>
      <div className='user-log-in-control'>
        <button
          data-test-id='profile-button'
          onClick={() => {
            navigate('/profile');
          }}
          className='buttons'
          type='button'
        >
          <h5>Профиль</h5>
        </button>
        <button
          data-test-id='exit-button'
          onClick={() => {
            localStorage.removeItem('jwt');
            navigate('/auth');
          }}
          className='buttons'
          type='button'
        >
          <h5>Выход</h5>
        </button>
      </div>
    </button>
  );
};
