import { Link, useParams } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';

import './breadcrumbs.css';

export const Breadcrumbs = () => {
  const { category } = useParams();
  const categories = useAppSelector((state) => state.categories);
  const book = useAppSelector((state) => state.book);

  const count =
    category === 'all' ? 'Все книги' : categories?.content?.filter((element) => element.path === category)[0].name;

  return (
    <div className='breadcrumbs'>
      {book?.content && (
        <p>
          <Link data-test-id='breadcrumbs-link' to={`/books/${category}`}>
            {count}
          </Link>
          <span className='slash-element'> / </span>
          <span data-test-id='book-name'>{book?.content?.title}</span>
        </p>
      )}
    </div>
  );
};
