import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as MobileLogo } from '../../img/logo/mobile.svg';
import { useAppSelector } from '../../redux/hooks';
import { BurgerButton } from '../burger-button';
import { ErrorWindow } from '../error-window';
import { UserCard } from '../user-card/user-card';

import './header-component.css';

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const post = useAppSelector((state) => state.posts);
  const [menuControlOpen, setMenuControlOpen] = useState(false);
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  return (
    <div>
      {post.error && !pathname.includes('rules') && !pathname.includes('contract') && (
        <div className={post.content ? 'error-in-header-disabled' : 'error-in-header'} data-test-id='error'>
          <ErrorWindow />
        </div>
      )}
      <div className={menuControlOpen ? 'openMenuHeader' : 'header'}>
        <MobileLogo
          onClick={() => {
            navigate('/books/all');
          }}
          className='header-logo'
        />{' '}
        <BurgerButton />
        {pathname.includes('profile') ? <h1>Личный кабинет</h1> : <h1>Библиотека</h1>}
        {windowDimenion.winWidth > 768 && (
          <UserCard setMenuControlOpen={setMenuControlOpen} menuControlOpen={menuControlOpen} />
        )}
      </div>
    </div>
  );
};
