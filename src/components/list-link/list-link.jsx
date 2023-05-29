import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { getPostState } from '../../redux/selectors';

import './list-link.css';

export const ListLink = ({ name, path, active, visible, test5, test6 }) => {
  const post = useAppSelector(getPostState);

  const count = post.content?.filter((element) => element.categories.some((item) => item === name));

  return (
    count && (
      <li className={active ? 'category-active' : 'category'}>
        <Link className={visible ? '' : 'for-never-tests'} to={`books/${path}`}>
          <div className={active ? 'active-list-category-title' : 'list-category-title'}>
            <h5>
              <span data-test-id={`${test5}${path}`}>{name}</span>
              <span className='category-count-menu' data-test-id={`${test6}${path}`}>
                {String(count.length)}
              </span>
            </h5>
          </div>
        </Link>
      </li>
    )
  );
};
