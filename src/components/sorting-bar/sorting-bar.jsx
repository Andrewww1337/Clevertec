import { useEffect, useRef, useState } from 'react';

import { ReactComponent as Column } from '../../img/icon/Icon_column.svg';
import { ReactComponent as Row } from '../../img/icon/Icon_row.svg';
import { ReactComponent as Rating } from '../../img/icon/Icon-rating.svg';
import { ReactComponent as RatingUp } from '../../img/icon/Icon-rating-up.svg';
import { ReactComponent as Search } from '../../img/icon/Icon-search.svg';
import { useAppSelector } from '../../redux/hooks';

import './sorting-bar.css';

export const SortingBar = ({
  activeRender,
  setActiveRender,
  setSortingForRating,
  sortingForRating,
  onChange,
  inputRef,
  smallSearchRef,
}) => {
  const post = useAppSelector((state) => state.posts);

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
  const [openInput, setOpenInput] = useState(false);

  useEffect(() => {
    smallSearchRef.current?.focus();
  }, [smallSearchRef, openInput]);

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  return (
    post.content && (
      <div className='coting-bar-wraper'>
        <div className={openInput ? 'sorting-bar' : 'for-tests'}>
          <div className='input-with-icon-after-open'>
            <input
              data-test-id={windowDimenion.winWidth > 510 ? '' : 'input-search'}
              ref={smallSearchRef}
              onChange={onChange}
              className={openInput ? 'searchInputOpen' : ''}
              placeholder='Поиск книги или автора…'
              type='text'
            />
            <button
              type='button'
              data-test-id='button-search-close'
              onClick={() => {
                setOpenInput(false);
              }}
              className='cross'
              aria-hidden='true'
            />
          </div>
        </div>

        <div className={openInput ? 'for-tests' : 'sorting-bar'}>
          <div className='sorting-bar-left-side'>
            <div className={windowDimenion.winWidth > 510 ? 'input-with-icon' : 'for-tests'}>
              <input
                data-test-id={windowDimenion.winWidth > 510 ? 'input-search' : ''}
                placeholder='Поиск книги или автора…'
                type='text'
                ref={inputRef}
                onChange={onChange}
              />
              <i className='fa' aria-hidden='true' />
            </div>

            <button
              data-test-id='button-search-open'
              onClick={() => {
                setOpenInput(true);
              }}
              type='button'
              className={windowDimenion.winWidth > 510 ? 'for-tests' : 'little-button'}
            >
              <Search className='icon-in-button' />
            </button>

            <button
              type='button'
              data-test-id='sort-rating-button'
              onClick={() => {
                setSortingForRating(!sortingForRating);
              }}
              className={windowDimenion.winWidth > 510 ? 'sorting-button' : 'for-tests'}
            >
              {sortingForRating ? <Rating /> : <RatingUp />} По рейтингу
            </button>

            <button
              type='button'
              onClick={() => {
                setSortingForRating(!sortingForRating);
              }}
              className={windowDimenion.winWidth > 510 ? 'for-tests' : 'little-button'}
            >
              {sortingForRating ? <Rating className='icon-in-button' /> : <RatingUp className='icon-in-button' />}
            </button>
          </div>
          <div>
            <button
              data-test-id='button-menu-view-window'
              type='button'
              onClick={() => {
                setActiveRender(true);
              }}
              className={activeRender ? 'button-with-icon-active' : 'button-with-icon'}
            >
              <Column className={activeRender ? 'icon-in-button-active' : 'icon-in-button'} />
            </button>
            <button
              data-test-id='button-menu-view-list'
              type='button'
              onClick={() => {
                setActiveRender(false);
              }}
              className={activeRender ? 'button-with-icon' : 'button-with-icon-active'}
            >
              <Row className={activeRender ? 'icon-in-button' : 'icon-in-button-active'} />
            </button>
          </div>
        </div>
      </div>
    )
  );
};
