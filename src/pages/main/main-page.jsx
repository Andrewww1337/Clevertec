import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BookList } from '../../components/book-list';
import { SortingBar } from '../../components/sorting-bar';
import { SuccessWindow } from '../../components/success-booking';
import { getBookingFailure, getBookingSuccess } from '../../features/booking';
import { getDeleteFailure, getDeleteSuccess } from '../../features/delete';
import { getPost } from '../../features/posts';
import { getRebookingFailure, getRebookingSuccess } from '../../features/rebooking';
import { getUser } from '../../features/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getBookingState,
  getCategoriesState,
  getDeleteState,
  getPostState,
  getRebookingState,
} from '../../redux/selectors';

import './main-page.css';

export const MainPage = () => {
  const [activeRender, setActiveRender] = useState(true);
  const [sortingForRating, setSortingForRating] = useState(true);
  const [rebookingError, setRebookingError] = useState(false);
  const [deleteBookingError, setDeleteBookingError] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [showWarningWindow, setShowWarningWindow] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchArt, setSearchArt] = useState(null);
  const dispatch = useAppDispatch();
  const post = useAppSelector(getPostState);
  const categories = useAppSelector(getCategoriesState);
  const booking = useAppSelector(getBookingState);
  const rebooking = useAppSelector(getRebookingState);
  const deleteBooking = useAppSelector(getDeleteState);
  const { category } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const searchRef = useRef(null);
  const smallSearchRef = useRef(null);
  const sortRatingUp = (a, b) =>
    (a.rating === null) - (b.rating === null) || +(b.rating > a.rating) || -(b.rating < a.rating);
  const sortRatingDown = (a, b) =>
    (b.rating === null) - (a.rating === null) || +(a.rating > b.rating) || -(a.rating < b.rating);
  const show = () => {
    setShowWindow(false);
    setRebookingError(false);
    setDeleteBookingError(false);
  };
  const showWarning = () => {
    setShowWarningWindow(false);
    setRebookingError(false);
    setDeleteBookingError(false);
  };

  useEffect(() => {
    if (showWindow) {
      setTimeout(show, 4000);
    }
    if (showWarningWindow) {
      setTimeout(showWarning, 4000);
    }
  }, [showWarningWindow, showWindow]);

  useEffect(() => {
    if (booking.content || rebooking.content || deleteBooking.content) {
      dispatch(getPost('/api/books'));
      dispatch(getBookingSuccess(null));
      dispatch(getRebookingSuccess(null));
      dispatch(getDeleteSuccess(null));
      setShowWindow(true);
      if (rebooking.content) {
        setRebookingError(true);
      }
      if (deleteBooking.content) {
        setDeleteBookingError(true);
      }
    }
  }, [booking.content, deleteBooking.content, dispatch, rebooking.content]);

  useEffect(() => {
    if (booking.error || rebooking.error || deleteBooking.error) {
      dispatch(getPost('/api/books'));
      dispatch(getBookingFailure(null));
      dispatch(getRebookingFailure(null));
      dispatch(getDeleteFailure(null));
      setShowWarningWindow(true);
      if (rebooking.error) {
        setRebookingError(true);
      }
      if (deleteBooking.error) {
        setDeleteBookingError(true);
      }
    }
  }, [booking.error, deleteBooking.error, dispatch, rebooking.error]);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(getPost('/api/books'));
    } else if (!sessionStorage.getItem('recovering')) {
      navigate('/auth');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (searchActive === false) {
      if (post.content && category === 'all') {
        setBook([...post.content].sort(sortingForRating ? sortRatingUp : sortRatingDown));
      }
      if (post.content && category !== 'all') {
        setBook(
          [...post.content]
            .filter((element) =>
              element.categories.some(
                (item) => item === categories.content?.filter((el) => el.path === category)[0].name
              )
            )
            .sort(sortingForRating ? sortRatingUp : sortRatingDown)
        );
      }
    } else {
      if (post.content && category === 'all') {
        setBook(
          [...post.content]
            .sort(sortingForRating ? sortRatingUp : sortRatingDown)
            .filter((element) => element.title.toLowerCase().includes(searchArt.toLowerCase()))
        );
      }
      if (post.content && category !== 'all') {
        setBook(
          [...post.content]
            .filter((element) =>
              element.categories.some(
                (item) => item === categories.content?.filter((el) => el.path === category)[0].name
              )
            )
            .sort(sortingForRating ? sortRatingUp : sortRatingDown)
            .filter((element) => element.title.toLowerCase().includes(searchArt.toLowerCase()))
        );
      }
    }
  }, [post.content, categories.content, category, searchArt, sortingForRating, searchActive]);

  const onSearchChange = () => {
    if (String(searchRef.current?.value).length > 0 || String(smallSearchRef.current?.value).length > 0) {
      setSearchActive(true);
      setSearchArt(
        String(String(searchRef.current?.value).length > 0 ? searchRef.current?.value : smallSearchRef.current?.value)
      );
    } else {
      setSearchActive(false);
      setSearchArt(null);
    }
  };

  return (
    <section data-test-id='main-page' className='main-page'>
      {showWindow && (
        <SuccessWindow
          deleteBooking={deleteBookingError}
          rebooking={rebookingError}
          open={setShowWindow}
          info={true}
          bookList={true}
        />
      )}
      {showWarningWindow && (
        <SuccessWindow
          deleteBooking={deleteBookingError}
          rebooking={rebookingError}
          open={setShowWarningWindow}
          info={false}
          bookList={true}
        />
      )}
      <SortingBar
        inputRef={searchRef}
        smallSearchRef={smallSearchRef}
        activeRender={activeRender}
        sortingForRating={sortingForRating}
        setSortingForRating={setSortingForRating}
        setActiveRender={setActiveRender}
        onChange={onSearchChange}
      />
      <BookList
        searchActive={searchActive}
        searchArt={searchArt}
        filterBooks={book}
        sortingForRating={sortingForRating}
        setSortingForRating={setSortingForRating}
        activeRender={activeRender}
        setActiveRender={setActiveRender}
      />
    </section>
  );
};
