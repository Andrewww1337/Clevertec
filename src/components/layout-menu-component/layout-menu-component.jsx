import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { getPostState } from '../../redux/selectors';
import { Menu } from '../menu';

import './layout-menu-component.css';

export const LayoutMenu = () => {
  const post = useAppSelector(getPostState);
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
    <div
      className={
        windowDimenion.winWidth > 768
          ? post.isLoading === 'pending' || post.error
            ? 'layout-nemu-loading layout-menu'
            : 'layout-menu'
          : '.'
      }
    >
      <div className={windowDimenion.winWidth > 768 ? '' : 'for-amazing-tests'}>
        <Menu
          test1='navigation-showcase'
          test2='navigation-books'
          test3='navigation-terms'
          test4='navigation-contract'
          test5='navigation-'
          test6='navigation-book-count-for-'
        />
      </div>
      <div
        className={
          windowDimenion.winWidth > 768
            ? 'layout-menu-outlet'
            : post.isLoading === 'pending' || post.error
            ? 'layout-nemu-loading-medium layout-menu-medium'
            : 'layout-menu-medium'
        }
      >
        <Outlet />
      </div>
    </div>
  );
};
