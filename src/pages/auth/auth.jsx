import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Loader } from '../../components/loader';
import { getAuth, getAuthFailure, getAuthSuccess } from '../../features/auth';
import { getPost } from '../../features/posts';
import { ReactComponent as ArrowRight } from '../../img/icon/Arrow-right.svg';
import { ReactComponent as EyeOpen } from '../../img/icon/Eye-open.svg';
import { ReactComponent as EyeClosed } from '../../img/icon/EyeClosed.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuthState } from '../../redux/selectors';
import { schemaAuth } from '../../yup/schemes';

import './auth.css';

// eslint-disable-next-line complexity
export const Auth = () => {
  const [loginBlur, setLoginBlure] = useState(false);
  const [passwordBlur, setPasswordBlure] = useState(false);
  const [authData, setAuthData] = useState(false);
  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [openEye, setOpenEye] = useState(false);
  const [visibleLoginLabel, setVisibleLoginLabel] = useState(false);
  const [visiblePasswordLabel, setVisiblePasswordLabel] = useState(false);

  const dispatch = useAppDispatch();
  const auth = useAppSelector(getAuthState);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaAuth),
  });
  const passwordverifi = watch('password');
  const loginWatcher = watch('identifier');

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/books/all');
    }
  }, [navigate]);

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

  const onSubmit = (data) => {
    dispatch(getAuthFailure(null));
    setAuthData(data);
    dispatch(getAuth(data));
  };
  const repeatAuth = () => {
    dispatch(getAuth(authData));
  };

  if (auth.content === true) {
    dispatch(getAuthSuccess(null));
    navigate('/books/all');
  }

  return (
    <div data-test-id='auth' className='form-page'>
      {auth.isLoading === 'pending' && (
        <div data-test-id='loader'>
          <Loader />
        </div>
      )}
      <h3 className='companyLogo'>Cleverland</h3>
      {(auth.error === 'Request failed with status code 400' || !auth.error) && (
        <div className='conteiner'>
          <h4 className='form-label'>Bход в личный кабинет</h4>
          <form data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='login-input'>
              {visibleLoginLabel && (
                <label className='label-in-form' htmlFor='login'>
                  Логин
                </label>
              )}
              <input
                name='identifier'
                ref={register}
                className={
                  visibleLoginLabel
                    ? errors?.identifier?.message
                      ? 'input-in-form-width-label-error'
                      : 'input-in-form-width-label'
                    : errors?.identifier?.message
                    ? 'input-in-form-error'
                    : 'input-in-form'
                }
                placeholder='Логин'
                onBlur={() => {
                  setLoginBlure(true);
                  setLoginFocus(false);
                }}
                onFocus={() => {
                  setLoginFocus(true);
                }}
                onChange={() => {
                  if (loginBlur) {
                    setLoginBlure(false);
                  }
                }}
                type='text'
              />
            </div>

            {errors?.identifier?.message && (
              <div data-test-id='hint' className='error-input'>
                Поле не может быть пустым
              </div>
            )}

            {!errors?.identifier?.message && <div className='input-helper' />}
            <div className='password-input'>
              {visiblePasswordLabel && (
                <label className='label-in-form' htmlFor='password'>
                  Пароль
                </label>
              )}
              <input
                className={
                  visiblePasswordLabel
                    ? errors?.password?.message
                      ? 'input-in-form-width-label-error'
                      : 'input-in-form-width-label'
                    : errors?.password?.message
                    ? 'input-in-form-error'
                    : 'input-in-form'
                }
                placeholder='Пароль'
                name='password'
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

              <button
                type='button'
                onClick={() => {
                  setOpenEye(!openEye);
                }}
                className='eye'
                aria-hidden='true'
              >
                {openEye && visiblePasswordLabel && <EyeOpen data-test-id='eye-opened' />}
                {!openEye && visiblePasswordLabel && <EyeClosed data-test-id='eye-closed' />}
              </button>
            </div>

            {errors?.password?.message && (
              <div data-test-id='hint' className='error-input-helper'>
                Поле не может быть пустым
              </div>
            )}

            {!errors?.password?.message && <div className='input-helper-standart' />}
            {auth.error === 'Request failed with status code 400' && (
              <div data-test-id='hint' className='error-input-helper'>
                Неверный логин или пароль!
              </div>
            )}
            {auth.error === 'Request failed with status code 400' && (
              <div className='input-helper-standart'>
                <Link to='/forgot-pass'>Восстановить?</Link>
              </div>
            )}
            {!auth.error && (
              <div className='input-helper-standart'>
                {' '}
                <Link to='/forgot-pass'>Забыли логин или пароль?</Link>
              </div>
            )}
            {!auth.error && <div className='error-input-helper' />}
            <button className='submit-button' value='вход' type='submit'>
              ВХОД
            </button>
          </form>
          <div className='form-footer'>
            <p className='question-form'>Нет учетной записи?</p>
            <Link className='link-in-form' to='/registration'>
              РЕГИСТРАЦИЯ <ArrowRight className='arrow-in-form' />
            </Link>
          </div>
        </div>
      )}
      {auth.error && auth.error !== 'Request failed with status code 400' && (
        <div data-test-id='status-block' className='modal-conteiner'>
          <h4 className='form-label'>Вход не выполнен</h4>
          <p className='modal-message'>Что-то пошло не так.Поробуйте еще раз</p>

          <button
            className='submit-button'
            onClick={() => {
              repeatAuth();
            }}
            type='button'
          >
            <p>ПОВТОРИТЬ</p>
          </button>
        </div>
      )}
    </div>
  );
};
