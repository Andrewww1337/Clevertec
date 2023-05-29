import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PhotoAllert } from '../../components/add-photo-allert';
import { BookCardProfile } from '../../components/book-card-in-profile';
import { Loader } from '../../components/loader';
import { Review } from '../../components/review-component';
import { SmallBookCardProfile } from '../../components/small-book-card';
import { getAvatar, getAvatarFailure, getAvatarSuccess } from '../../features/avatar';
import { getEdit, getEditFailure, getEditSuccess } from '../../features/edit';
import { getPost } from '../../features/posts';
import { getReviewFailure, getReviewSuccess } from '../../features/review';
import { getUser } from '../../features/user';
import revievIcon from '../../img/avatars/cat.svg';
import { ReactComponent as CheckMark } from '../../img/icon/check-mark.svg';
import { ReactComponent as EyeOpen } from '../../img/icon/Eye-open.svg';
import { ReactComponent as EyeClosed } from '../../img/icon/EyeClosed.svg';
import { ReactComponent as PhotoIcon } from '../../img/icon/Icon_photo.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getAvatarState,
  getDeleteState,
  getEditReviewState,
  getEditState,
  getReviewState,
  getUserState,
} from '../../redux/selectors';
import { schemaChangeUserInfo } from '../../yup/schemes';

import './profile.css';

import 'swiper/css';
import 'swiper/css/pagination';

// eslint-disable-next-line complexity
export const Profile = () => {
  const { register, handleSubmit, watch, reset, errors } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaChangeUserInfo),
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState);
  const edit = useAppSelector(getEditState);
  const editReview = useAppSelector(getEditReviewState);
  const deleteState = useAppSelector(getDeleteState);
  const avatar = useAppSelector(getAvatarState);
  const review = useAppSelector(getReviewState);
  const [loginBlur, setLoginBlure] = useState(true);
  const [passwordBlur, setPasswordBlure] = useState(true);
  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [openEye, setOpenEye] = useState(false);
  const [passwordPassed, setPasswordPassed] = useState(false);
  const [visibleLoginLabel, setVisibleLoginLabel] = useState(false);
  const [visiblePasswordLabel, setVisiblePasswordLabel] = useState(false);
  const [nameBlur, setNameBlure] = useState(true);
  const [lastNameBlur, setLastNameBlure] = useState(true);
  const [nameFocus, setNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [visibleNameLabel, setVisibleNameLabel] = useState(false);
  const [visibleLastNameLabel, setVisibleLastNameLabel] = useState(false);
  const [nameNumber, setNameNumber] = useState('phone');
  const [errorNumber, setErrorNumber] = useState(false);
  const [firstAtiveNumber, setFirstAtiveNumber] = useState(false);
  const [numberBlur, setNumberBlure] = useState(true);
  const [emailBlur, setEmailBlure] = useState(true);
  const [numberFocus, setNumberFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [visibleEmailLabel, setVisibleEmailLabel] = useState(false);
  const [visibleNumberLabel, setVisibleNumberLabel] = useState(false);
  const [emptyInput, setEmptyInput] = useState(null);
  const [editProfile, setEditProfile] = useState(true);
  const [loaderShow, setLoaderShow] = useState(false);
  const [visibleRevievWindow, setVisibleRevievWindow] = useState(false);
  const [bookReview, setBookReview] = useState(null);
  const [showWarningWindow, setShowWarningWindow] = useState(false);
  const [showWarningWindowError, setShowWarningWindowError] = useState(false);
  const [showWarningWindowErrorAvatar, setShowWarningWindowErrorAvatar] = useState(false);
  const [showWarningWindowAvatar, setShowWarningWindowAvatar] = useState(false);
  const [showWarningWindowDelete, setShowWarningWindowDelete] = useState(false);
  const [showWarningWindowErrorDelete, setShowWarningWindowErrorDelete] = useState(false);
  const [showWarningWindowReview, setShowWarningWindowReview] = useState(false);
  const [showWarningWindowErrorReview, setShowWarningWindowErroReview] = useState(false);
  const [showWarningWindowEditReview, setShowWarningWindowEditReview] = useState(false);
  const [showWarningWindowErrorEditReview, setShowWarningWindowErroEditReview] = useState(false);

  const passwordverifi = watch('password');
  const loginWatcher = watch('login');
  const nameWatcher = watch('firstName');
  const lastNameWatcher = watch('lastName');
  const emailWatcher = watch('email');
  const numberWatcher = watch('phone');
  const textInput = React.createRef();
  const longErrorRequired =
    errorNumber && errors?.phone?.message && errors?.phone?.message !== 'о' && numberWatcher?.length > 0;
  const shortErrorRequired =
    errorNumber && errors?.phone?.message && errors?.phone?.message !== 'о' && numberWatcher?.length < 1;
  const requiredFocusInput = errors?.phone?.message === 'о' && !numberBlur && !firstAtiveNumber;
  const requiredFocusInputHelper = errors?.phone?.message === 'о' && !numberBlur && firstAtiveNumber && errorNumber;
  const requiredBlurInputError = errors?.phone?.message === 'о' && numberBlur && firstAtiveNumber && errorNumber;
  const requiredShortError = errors?.phone?.message === 'о' && numberWatcher?.length < 1;
  const helperFocus = !errors?.phone?.message && !numberBlur && errorNumber;
  const noEmptyHelper = !errorNumber && firstAtiveNumber;
  const longErrorFocus = errorNumber && numberWatcher?.length > 1 && numberBlur && !errors?.phone?.message;
  const emptyErrorLong = !errors?.phone?.message && numberWatcher?.length < 1;
  const hasErrorLong = errors?.phone?.message && numberWatcher?.length < 1;

  const toDay = Date.parse(new Date());

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

  const showWarning = () => {
    setShowWarningWindow(false);
  };
  const showWarningError = () => {
    setShowWarningWindowError(false);
  };
  const showWarningAvatar = () => {
    setShowWarningWindowAvatar(false);
  };
  const showWarningErrorAvatar = () => {
    setShowWarningWindowErrorAvatar(false);
  };
  const showWarningDelete = () => {
    setShowWarningWindowDelete(false);
  };
  const showWarningErrorDelete = () => {
    setShowWarningWindowErrorDelete(false);
  };
  const showWarningReview = () => {
    setShowWarningWindowReview(false);
  };
  const showWarningErrorReview = () => {
    setShowWarningWindowErroReview(false);
  };

  const showWarningEditReview = () => {
    setShowWarningWindowEditReview(false);
  };
  const showWarningErrorEditReview = () => {
    setShowWarningWindowErroEditReview(false);
  };

  const telPhoneOnBlur = () => {
    setNameNumber('phone');
    setNumberBlure(true);
    setNumberFocus(false);
  };

  const telPhoneOnFocus = () => {
    setNameNumber('');
    setNumberFocus(true);
  };
  const telPhoneOnChange = () => {
    const res = textInput?.current?.value.replace(/\D/g, '');

    if (String(res) !== 'undefined' && String(res).length === 12) {
      if (['29', '33', '44', '25'].includes(res.substr(3, 2))) {
        setErrorNumber(false);
      } else {
        setErrorNumber(true);
      }
    } else if (String(res) !== 'undefined' && String(res).length > 3) {
      setFirstAtiveNumber(true);

      setErrorNumber(true);
    } else {
      setFirstAtiveNumber(false);
    }

    if (numberBlur) {
      setNumberBlure(false);
    }
  };

  const onSubmitStepOne = (data) => {
    dispatch(getEdit(data));
    setEditProfile(true);
  };
  const onLoadPhoto = (e) => {
    setEmptyInput(e.target.files[0]);
  };

  const handl = async () => {
    setLoaderShow(true);
    const formData = new FormData();
    formData.append('files', emptyInput);
    try {
      const response = await axios({
        method: 'post',
        url: 'https://library-cleverland-2jfze.ondigitalocean.app/api/upload',
        data: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'multipart/form-data' },
      });

      dispatch(getAvatar(response.data[0]?.id));
      setLoaderShow(false);
      setShowWarningWindowAvatar(true);
    } catch (error) {
      setShowWarningWindowErrorAvatar(true);
    }
  };

  useEffect(() => {
    if (showWarningWindow) {
      setTimeout(showWarning, 10000);
    }
    if (showWarningWindowError) {
      setTimeout(showWarningError, 10000);
    }
  }, [showWarningWindow, showWarningWindowError]);
  useEffect(() => {
    if (review.content) {
      setShowWarningWindowReview(true);
    }
    if (review.error) {
      setShowWarningWindowErroReview(true);
    }
  }, [review.content, review.error]);
  useEffect(() => {
    if (editReview.content) {
      setShowWarningWindowEditReview(true);
    }
    if (editReview.error) {
      setShowWarningWindowErroEditReview(true);
    }
  }, [editReview.content, editReview.error]);

  useEffect(() => {
    if (review.content || editReview.content) {
      dispatch(getReviewSuccess(null));
      dispatch(getUser());
    }
    if (review.error || editReview.error) {
      dispatch(getReviewFailure(null));
      dispatch(getUser());
    }
  }, [dispatch, editReview.content, editReview.error, review.content, review.error]);

  useEffect(() => {
    if (showWarningWindowAvatar) {
      setTimeout(showWarningAvatar, 10000);
    }
    if (showWarningWindowErrorAvatar) {
      setTimeout(showWarningErrorAvatar, 10000);
    }
  }, [showWarningWindowAvatar, showWarningWindowErrorAvatar]);

  useEffect(() => {
    if (showWarningWindowReview) {
      setTimeout(showWarningReview, 10000);
    }
    if (showWarningWindowErrorReview) {
      setTimeout(showWarningErrorReview, 10000);
    }
  }, [showWarningWindowErrorReview, showWarningWindowReview]);
  useEffect(() => {
    if (showWarningWindowEditReview) {
      setTimeout(showWarningEditReview, 10000);
    }
    if (showWarningWindowErrorEditReview) {
      setTimeout(showWarningErrorEditReview, 10000);
    }
  }, [showWarningWindowEditReview, showWarningWindowErrorEditReview]);

  useEffect(() => {
    if (showWarningWindowDelete) {
      setTimeout(showWarningDelete, 10000);
    }
    if (showWarningWindowErrorDelete) {
      setTimeout(showWarningErrorDelete, 10000);
    }
  }, [showWarningWindowDelete, showWarningWindowErrorDelete]);

  useEffect(() => {
    reset({
      firstName: user.content?.firstName,
      lastName: user.content?.lastName,
      login: user.content?.username,
      email: user.content?.email,
      phone: user.content?.phone,
      password: 'password',
    });
  }, [reset, user]);

  useEffect(() => {
    if (numberWatcher === '') {
      reset({
        firstName: nameWatcher,
        lastName: lastNameWatcher,
        login: loginWatcher,
        email: emailWatcher,
        phone: '+375 (xx) xxx-xx-xx',
        password: passwordverifi,
      });
    }
  }, [emailWatcher, lastNameWatcher, loginWatcher, nameWatcher, numberWatcher, passwordverifi, reset]);

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  useEffect(() => {
    if (emailWatcher?.length > 0 || emailFocus) {
      setVisibleEmailLabel(true);
    } else {
      setVisibleEmailLabel(false);
    }
  }, [emailFocus, emailWatcher]);
  useEffect(() => {
    if (numberWatcher?.length > 0 || numberFocus) {
      setVisibleNumberLabel(true);
    } else {
      setVisibleNumberLabel(false);
    }
  }, [numberFocus, numberWatcher]);

  useEffect(() => {
    if (nameWatcher?.length > 0 || nameFocus) {
      setVisibleNameLabel(true);
    } else {
      setVisibleNameLabel(false);
    }
  }, [nameFocus, nameWatcher]);

  useEffect(() => {
    if (lastNameWatcher?.length > 0 || lastNameFocus) {
      setVisibleLastNameLabel(true);
    } else {
      setVisibleLastNameLabel(false);
    }
  }, [lastNameFocus, lastNameWatcher]);

  useEffect(() => {
    if (loginWatcher?.length > 0 || loginFocus) {
      setVisibleLoginLabel(true);
    } else {
      setVisibleLoginLabel(false);
    }
    if (passwordverifi?.length > 0 || passwordFocus) {
      setVisiblePasswordLabel(true);
    } else {
      setVisiblePasswordLabel(false);
    }
  }, [loginFocus, loginWatcher, passwordFocus, passwordverifi]);
  useEffect(() => {
    if (
      passwordverifi?.length > 7 &&
      passwordverifi?.toLowerCase() !== passwordverifi &&
      passwordverifi?.match(/[0-9]/i)
    ) {
      setPasswordPassed(true);
    } else {
      setPasswordPassed(false);
    }
  }, [passwordverifi]);

  useEffect(() => {
    if (edit.content) {
      dispatch(getUser());

      dispatch(getPost('/api/books'));
      dispatch(getEditSuccess(null));
      setShowWarningWindow(true);
    }
    if (edit.error) {
      dispatch(getUser());

      dispatch(getPost('/api/books'));
      dispatch(getEditFailure(null));
      setShowWarningWindowError(true);
    }
  }, [dispatch, edit.content, edit.error]);
  useEffect(() => {
    if (avatar.content) {
      dispatch(getUser());

      dispatch(getPost('/api/books'));
      dispatch(getAvatarSuccess(null));
      setShowWarningWindowAvatar(true);
    }
    if (avatar.error) {
      dispatch(getUser());

      dispatch(getPost('/api/books'));
      dispatch(getAvatarFailure(null));
      setShowWarningWindowErrorAvatar(true);
    }
  }, [avatar.content, avatar.error, dispatch]);

  useEffect(() => {
    dispatch(getPost('/api/books'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (emptyInput) {
      handl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emptyInput]);

  return (
    <section className='profile'>
      {visibleRevievWindow && (
        <Review id={bookReview} setBookReview={setBookReview} setVisibleRevievWindow={setVisibleRevievWindow} />
      )}
      {loaderShow ||
        review.isLoading === 'pending' ||
        editReview.isLoading === 'pending' ||
        edit.isLoading === 'pending' ||
        deleteState.isLoading === 'pending' ||
        (avatar.isLoading === 'pending' && (
          <div data-test-id='loader' className='loader'>
            <Loader />
          </div>
        ))}
      {showWarningWindowErrorEditReview && (
        <PhotoAllert
          open={setShowWarningWindowErroEditReview}
          text='Изменения не были сохранены. Попробуйте позже!'
          info={false}
        />
      )}
      {showWarningWindowEditReview && (
        <PhotoAllert
          open={setShowWarningWindowEditReview}
          text='Спасибо, что нашли время изменить оценку!'
          info={true}
        />
      )}
      {showWarningWindowErrorReview && (
        <PhotoAllert
          open={setShowWarningWindowErroReview}
          text='Оценка не была отправлена. Попробуйте позже!'
          info={false}
        />
      )}
      {showWarningWindowReview && (
        <PhotoAllert open={setShowWarningWindowReview} text='Спасибо, что нашли время оценить книгу!' info={true} />
      )}
      {showWarningWindowDelete && (
        <PhotoAllert open={setShowWarningWindowDelete} text='Бронирование книги успешно отменено!' info={true} />
      )}
      {showWarningWindowErrorDelete && (
        <PhotoAllert
          open={setShowWarningWindowErrorDelete}
          text='Не удалось снять бронирование книги. Попробуйте позже!'
          info={false}
        />
      )}

      {showWarningWindow && <PhotoAllert open={setShowWarningWindow} text='Изменения успешно сохранены!' info={true} />}
      {showWarningWindowError && (
        <PhotoAllert
          open={setShowWarningWindowError}
          text='Изменения не были сохранены. Попробуйте позже!'
          info={false}
        />
      )}
      {showWarningWindowAvatar && (
        <PhotoAllert open={setShowWarningWindowAvatar} text='Фото успешно сохранено!' info={true} />
      )}
      {showWarningWindowErrorAvatar && (
        <PhotoAllert
          open={setShowWarningWindowErrorAvatar}
          text='Что-то пошло не так, фото не сохранилось. Попробуйте позже!'
          info={false}
        />
      )}
      <div data-test-id='profile-avatar' className='about-user-header'>
        <div className='avatar'>
          <img className='avatar-img' src={user.content?.avatar ? user.content.avatar : revievIcon} alt='no' />
          <div className='add-avatar'>
            <label className='input-file'>
              <input onChange={onLoadPhoto} type='file' name='file' />
              <span>
                <PhotoIcon />
              </span>
            </label>
          </div>
        </div>
        <div className='user-name'>
          <h1>{user.content?.firstName}</h1>
          <h1>{user.content?.lastName}</h1>
        </div>
      </div>
      <div className='about-user-body'>
        <h4>Учетные данные</h4>
        <p className='change-info'>Здесь вы можете отредактировать информацию о себе</p>
        <div>
          <form data-test-id='profile-form' onSubmit={handleSubmit(onSubmitStepOne)}>
            <div className='first-line'>
              <div className='one-input-section'>
                <div className='login-change-input'>
                  {visibleLoginLabel && (
                    <label className='label-in-form' htmlFor='login'>
                      Логин
                    </label>
                  )}
                  <input
                    name='login'
                    ref={register}
                    className={
                      visibleLoginLabel
                        ? errors?.login?.message
                          ? 'input-change-in-form-width-label-error'
                          : 'input-change-in-form-width-label'
                        : errors?.login?.message
                        ? 'input-change-in-form-error'
                        : 'input-change-in-form'
                    }
                    placeholder='Логин'
                    onBlur={() => {
                      setLoginBlure(true);
                      setLoginFocus(false);
                    }}
                    onFocus={() => {
                      setLoginFocus(true);
                    }}
                    disabled={editProfile}
                    onChange={() => {
                      if (loginBlur) {
                        setLoginBlure(false);
                      }
                    }}
                    type='text'
                  />
                </div>

                {errors?.login?.message && loginBlur && loginWatcher?.length > 0 && (
                  <div data-test-id='hint' className='error-input'>
                    Используйте для логина латинский алфавит и цифры
                  </div>
                )}
                {errors?.login?.message && loginWatcher?.length < 1 && (
                  <div data-test-id='hint' className='error-input'>
                    Поле не может быть пустым
                  </div>
                )}
                {!errors?.login?.message && <div className='input-helper' />}
                {errors?.login?.message &&
                  !loginBlur &&
                  (errors?.login?.message === 'срич' ||
                    errors?.login?.message === 'ср' ||
                    errors?.login?.message === 'сринч' ||
                    errors?.login?.message === 'нсб' ||
                    errors?.login?.message === 'нсч') && (
                    <div data-test-id='hint' className='input-helper-form'>
                      Используйте для логина
                      <span
                        className={
                          errors?.login?.message === 'срич' ||
                          errors?.login?.message === 'ср' ||
                          errors?.login?.message === 'сринч' ||
                          errors?.login?.message === 'нсб'
                            ? 'custom-error-input'
                            : ''
                        }
                      >
                        {' '}
                        латинский алфавит{' '}
                      </span>{' '}
                      и{' '}
                      <span
                        className={
                          errors?.login?.message === 'нсч' || errors?.login?.message === 'сринч'
                            ? 'custom-error-input'
                            : ''
                        }
                      >
                        цифры
                      </span>
                    </div>
                  )}
              </div>
              <div className='one-input-section'>
                <div className='password-change-input'>
                  {visiblePasswordLabel && (
                    <label className='label-in-form' htmlFor='password'>
                      Пароль
                    </label>
                  )}
                  <input
                    className={
                      visiblePasswordLabel
                        ? errors?.password?.message
                          ? 'input-change-in-form-width-label-error'
                          : 'input-change-in-form-width-label'
                        : errors?.password?.message
                        ? 'input-change-in-form-error'
                        : 'input-change-in-form'
                    }
                    placeholder='Пороль'
                    name='password'
                    disabled={editProfile}
                    ref={register}
                    onBlur={() => {
                      setPasswordBlure(true);
                      setPasswordFocus(false);
                    }}
                    onFocus={() => {
                      setPasswordFocus(true);
                    }}
                    onChange={() => {
                      if (passwordBlur) {
                        setPasswordBlure(false);
                      }
                    }}
                    type={openEye ? 'text' : 'password'}
                  />
                  {passwordPassed && <CheckMark data-test-id='checkmark' className='check-mark' />}
                  <button
                    type='button'
                    onClick={() => {
                      setOpenEye(!openEye);
                    }}
                    className='eye'
                    aria-hidden='true'
                  >
                    {openEye && <EyeOpen data-test-id='eye-opened' />}
                    {!openEye && <EyeClosed data-test-id='eye-closed' />}
                  </button>
                </div>
                {!errors?.password?.message && <div className='input-helper' />}

                {errors?.password?.message && loginBlur && passwordverifi?.length < 1 && (
                  <div data-test-id='hint' className='error-input'>
                    Поле не может быть пустым
                  </div>
                )}
                {errors?.password?.message && passwordBlur && passwordverifi?.length > 0 && (
                  <div data-test-id='hint' className='error-input'>
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                  </div>
                )}
                {errors?.password?.message && !passwordBlur && passwordverifi?.length > 0 && (
                  <div data-test-id='hint' className='input-helper-form'>
                    Пароль
                    <span
                      className={
                        errors?.password?.message === 'к' ||
                        errors?.password?.message === 'кнбич' ||
                        errors?.password?.message === 'кеб' ||
                        errors?.password?.message === 'кнб'
                          ? 'custom-error-input'
                          : ''
                      }
                    >
                      {' '}
                      не менее 8 символов
                    </span>
                    , с{' '}
                    <span
                      className={
                        errors?.password?.message === 'нбб' ||
                        errors?.password?.message === 'кнб' ||
                        errors?.password?.message === 'нббич' ||
                        errors?.password?.message === 'кнбич'
                          ? 'custom-error-input'
                          : ''
                      }
                    >
                      заглавной буквой
                    </span>{' '}
                    и{' '}
                    <span
                      className={
                        errors?.password?.message === 'нсч' ||
                        errors?.password?.message === 'кнбич' ||
                        errors?.password?.message === 'кеб' ||
                        errors?.password?.message === 'нббич'
                          ? 'custom-error-input'
                          : ''
                      }
                    >
                      цифрой
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className='second-line'>
              <div className='one-input-section'>
                <div className='login-change-input'>
                  {visibleNameLabel && (
                    <label className='label-in-form' htmlFor='name'>
                      Имя
                    </label>
                  )}
                  <input
                    className={
                      visibleNameLabel
                        ? errors?.firstName?.message
                          ? 'input-change-in-form-width-label-error'
                          : 'input-change-in-form-width-label'
                        : errors?.firstName?.message
                        ? 'input-change-in-form-error'
                        : 'input-change-in-form'
                    }
                    placeholder='Имя'
                    name='firstName'
                    ref={register}
                    disabled={editProfile}
                    onBlur={() => {
                      setNameBlure(true);
                      setNameFocus(false);
                    }}
                    onFocus={() => {
                      setNameFocus(true);
                    }}
                    onChange={() => {
                      if (nameBlur) {
                        setNameBlure(false);
                      }
                    }}
                    type='text'
                  />
                </div>
                {errors?.firstName?.message && nameBlur && (
                  <div data-test-id='hint' className='error-input'>
                    Поле не может быть пустым
                  </div>
                )}

                {errors?.firstName?.message && !nameBlur && <div data-test-id='hint' className='input-helper' />}
                {!errors?.firstName?.message && <div className='input-helper' />}
              </div>
              <div className='one-input-section'>
                <div className='login-change-input'>
                  {visibleLastNameLabel && (
                    <label className='label-in-form' htmlFor='lastName'>
                      Фамилия
                    </label>
                  )}
                  <input
                    className={
                      visibleLastNameLabel
                        ? errors?.lastName?.message
                          ? 'input-change-in-form-width-label-error'
                          : 'input-change-in-form-width-label'
                        : errors?.lastName?.message
                        ? 'input-change-in-form-error'
                        : 'input-change-in-form'
                    }
                    placeholder='Фамилия'
                    ref={register}
                    name='lastName'
                    disabled={editProfile}
                    onBlur={() => {
                      setLastNameBlure(true);
                      setLastNameFocus(false);
                    }}
                    onFocus={() => {
                      setLastNameFocus(true);
                    }}
                    onChange={() => {
                      if (lastNameBlur) {
                        setLastNameBlure(false);
                      }
                    }}
                    type='text'
                  />
                </div>

                {errors?.lastName?.message && lastNameBlur && (
                  <div data-test-id='hint' className='error-input'>
                    Поле не может быть пустым
                  </div>
                )}
                {errors?.lastName?.message && !lastNameBlur && <div data-test-id='hint' className='input-helper' />}
                {!errors?.lastName?.message && <div className='input-helper' />}
              </div>
            </div>
            <div className='third-line'>
              <div className='one-input-section'>
                <div className='login-change-input'>
                  {visibleNumberLabel && (
                    <label className='label-in-form' htmlFor='number'>
                      Номер телефона
                    </label>
                  )}
                  <InputMask
                    name={nameNumber === 'phone' ? 'phone' : ''}
                    mask={numberFocus ? '+375 (99) 999-99-99' : ''}
                    maskPlaceholder='+375 (xx) xxx-xx-xx'
                    maskChar='x'
                    id='cardNumber'
                    disabled={editProfile}
                    className={
                      visibleNumberLabel
                        ? longErrorRequired ||
                          shortErrorRequired ||
                          requiredFocusInput ||
                          requiredBlurInputError ||
                          requiredShortError ||
                          longErrorFocus ||
                          emptyErrorLong
                          ? 'input-change-in-form-width-label-error'
                          : 'input-change-in-form-width-label'
                        : longErrorRequired ||
                          shortErrorRequired ||
                          requiredFocusInput ||
                          requiredBlurInputError ||
                          requiredShortError ||
                          longErrorFocus ||
                          emptyErrorLong
                        ? 'input-change-in-form-error'
                        : 'input-change-in-form'
                    }
                    placeholder='Номер телефона'
                    ref={nameNumber === 'phone' ? register : textInput}
                    onBlur={telPhoneOnBlur}
                    onFocus={telPhoneOnFocus}
                    onChange={telPhoneOnChange}
                  />
                </div>

                {!errorNumber && <div data-test-id='hint' className='input-helper' />}
                {longErrorRequired && (
                  <div data-test-id='hint' className='error-input'>
                    В формате +375 (xx) xxx-xx-xx
                  </div>
                )}

                {requiredFocusInputHelper && <div data-test-id='hint' className='input-helper' />}
                {requiredBlurInputError && (
                  <div data-test-id='hint' className='error-input'>
                    В формате +375 (xx) xxx-xx-xx
                  </div>
                )}

                {helperFocus && <div data-test-id='hint' className='input-helper' />}
                {noEmptyHelper && <div data-test-id='hint' className='input-helper' />}
                {hasErrorLong && <div data-test-id='hint' className='input-helper-form' />}
                {longErrorFocus && (
                  <div data-test-id='hint' className='error-input'>
                    В формате +375 (xx) xxx-xx-xx
                  </div>
                )}
              </div>
              <div className='one-input-section'>
                <div className='login-change-input'>
                  {visibleEmailLabel && (
                    <label className='label-in-form' htmlFor='email'>
                      Email
                    </label>
                  )}
                  <input
                    name='email'
                    ref={register}
                    disabled={editProfile}
                    className={visibleEmailLabel ? 'input-change-in-form-width-label' : 'input-change-in-form'}
                    placeholder='Email'
                    onBlur={() => {
                      setEmailBlure(true);
                      setEmailFocus(false);
                    }}
                    onFocus={() => {
                      setEmailFocus(true);
                    }}
                    onChange={() => {
                      if (emailBlur) {
                        setEmailBlure(false);
                      }
                    }}
                    type='text'
                  />
                </div>
                {errors?.email?.message && errors?.email?.message !== 'о' && (
                  <div data-test-id='hint' className='error-input'>
                    Введите корректный e-mail
                  </div>
                )}
                {errors?.email?.message && errors?.email?.message === 'о' && (
                  <div data-test-id='hint' className='error-input'>
                    Поле не может быть пустым
                  </div>
                )}
                {errors?.email?.message && !emailBlur && <div data-test-id='hint' className='input-helper' />}
                {!errors?.email?.message && <div data-test-id='hint' className='input-helper' />}
              </div>
            </div>
            <div className='button-profile-section'>
              {editProfile && (
                <button
                  data-test-id='edit-button'
                  className='edit-profile-body-button'
                  onClick={() => {
                    setEditProfile(false);
                  }}
                  type='button'
                >
                  Редактировать
                </button>
              )}
              {!editProfile && (
                <button
                  data-test-id='edit-button'
                  className='edit-profile-body-button'
                  onClick={() => {
                    setEditProfile(true);
                  }}
                  type='button'
                >
                  Редактировать
                </button>
              )}
              <button data-test-id='save-button' className='save-edit-button' disabled={editProfile} type='submit'>
                СОХРАНИТЬ ИЗМЕНЕНИЯ
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='booking-book-section'>
        <h1>Забронированная книга</h1>
        <p className='about-booking-section'>
          Здесь вы можете просмотреть забронированную книку, а так же отменить бронь
        </p>
        <div className='booking-books-section'>
          {!user.content?.booking?.book && (
            <div data-test-id='empty-blue-card' className='empty-section'>
              <h3>
                Забронируйте книгу <br />и она отобразится
              </h3>
            </div>
          )}

          <div
            data-test-id='expired'
            className={
              toDay > Date.parse(user.content?.booking?.dateOrder) + 86400000 ? 'overdue-section' : 'display-none'
            }
          >
            <h3>
              Дата бронирования <br />
              книги истекла
            </h3>
            <p>Через 24 часа книга будет доступна всем </p>
          </div>

          <div
            className={
              toDay > Date.parse(user.content?.booking?.dateOrder) + 86400000 ? 'booking-books-section-overdue' : ''
            }
          >
            {user.content?.booking?.book &&
              [user.content?.booking?.book].map((book) => (
                <BookCardProfile
                  {...book}
                  isOpenError={setShowWarningWindowErrorDelete}
                  isOpen={setShowWarningWindowDelete}
                  bookingId={user.content?.booking?.id}
                />
              ))}
          </div>
        </div>
      </div>
      <div className='rent-book-section'>
        <h1>Книга которую взяли</h1>
        <p className='about-booking-section'>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>
        <div className='booking-books-section'>
          {!user.content?.delivery?.book && (
            <div data-test-id='empty-blue-card' className='empty-section'>
              <h3>
                Прочитав книгу, <br />
                она отобразится в истории
              </h3>
            </div>
          )}

          {toDay > Date.parse(user.content?.delivery?.dateHandedTo) + 86400000 && (
            <div className='overdue-section'>
              <h3>
                Вышел срок <br />
                пользования книги
              </h3>
              <p>Верните книгу, пожалуйста</p>
            </div>
          )}
          <div
            className={
              toDay > Date.parse(user.content?.delivery?.dateHandedTo) + 86400000 ? 'booking-books-section-overdue' : ''
            }
          >
            {user.content?.delivery?.book &&
              [user.content?.delivery?.book].map((book) => (
                <BookCardProfile
                  {...book}
                  onHands={true}
                  isOpenError={setShowWarningWindowErrorDelete}
                  dateHandedTo={user.content?.delivery?.dateHandedTo}
                  isOpen={setShowWarningWindowDelete}
                  bookingId={user.content?.booking?.id}
                />
              ))}
          </div>
        </div>
      </div>
      <div data-test-id='history' className='history-book-section'>
        <h1>История</h1>
        <p className='about-booking-section'>Список прочитанных книг</p>
        <div className={user.content?.history?.books ? 'history-books-sectioт-active' : 'history-books-section'}>
          {!user.content?.history?.books && (
            <div data-test-id='empty-blue-card' className='empty-section'>
              <h3>
                Вы не читали книг <br />
                из нашей библиотеки
              </h3>
            </div>
          )}

          <Swiper
            spaceBetween={0}
            slidesPerView={windowDimenion.winWidth > 768 ? 4 : windowDimenion.winWidth > 320 ? 3 : 1}
            pagination={{
              clickable: true,
            }}
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': ' #363636',
            }}
            navigation={true}
            modules={[Navigation, Thumbs, Pagination, Scrollbar]}
            className='swiper-in-profile'
          >
            {user.content?.history?.books?.map((book) => (
              <SwiperSlide>
                <SmallBookCardProfile
                  {...book}
                  user={user}
                  setBookReview={setBookReview}
                  visibleRevievWindow={visibleRevievWindow}
                  setVisibleRevievWindow={setVisibleRevievWindow}
                  onHands={true}
                  dateHandedTo={user.content?.delivery?.dateHandedTo}
                  isOpen={setShowWarningWindowDelete}
                  bookingId={user.content?.booking?.id}
                  className='mySwiperSwiper'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
