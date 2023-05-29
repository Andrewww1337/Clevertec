import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { BookCard } from '../book-card';
import { Calendar } from '../calendar';
import { Loader } from '../loader';

import './book-list.css';

export const BookList = ({ activeRender, setActiveRender, filterBooks, searchArt, searchActive }) => {
  const post = useAppSelector((state) => state.posts);
  const categories = useAppSelector((state) => state.categories);
  const { category } = useParams();
  const [selectedDate, setSelectedDay] = useState();

  const [bookId, setBookId] = useState(null);
  const [custonerId, setCustomerId] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const name =
    category === 'all' ? 'Все книги' : categories.content?.filter((element) => element.path === category)[0].name;
  const count = post.content?.filter((element) => element.categories.some((item) => item === name));

  return (
    <div data-test-id='content' className={activeRender ? 'book-list' : 'book-list-horizontal'}>
      {post.isLoading === 'pending' && (
        <div data-test-id='loader' className={filterBooks ? 'disabled-preloader' : 'loader'}>
          <Loader />
        </div>
      )}

      {bookId && (
        <Calendar
          locale='ru-RU'
          bookId={bookId}
          setBookId={setBookId}
          selectedDate={selectedDate}
          selectDate={(date) => setSelectedDay(date)}
          custonerId={custonerId}
          setCustomerId={setCustomerId}
          bookingId={bookingId}
          setBookingId={setBookingId}
        />
      )}

      {filterBooks &&
        filterBooks.map((book) => (
          <BookCard
            bookingId={bookingId}
            setBookingId={setBookingId}
            custonerId={custonerId}
            setCustomerId={setCustomerId}
            bookId={bookId}
            setBookId={setBookId}
            searchActive={searchActive}
            searchArt={searchArt}
            activeRender={activeRender}
            category={category}
            setActiveRender={setActiveRender}
            key={book.id}
            {...book}
          />
        ))}

      <div
        className={
          (filterBooks?.length === 0 && count?.length !== 0) || (filterBooks?.length === 0 && category === 'all')
            ? 'clear-books-list'
            : 'clear-book-list-invisible'
        }
      >
        <p data-test-id='search-result-not-found'>
          <p>По запросу </p>
          <p>ничего не найдено</p>
        </p>
      </div>

      <div className={count?.length === 0 && category !== 'all' ? 'clear-books-list' : 'clear-book-list-invisible'}>
        <p>
          <p data-test-id='empty-category'>В этой категории книг ещё нет</p>
        </p>
      </div>
    </div>
  );
};
