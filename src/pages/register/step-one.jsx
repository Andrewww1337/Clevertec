import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactComponent as ArrowRight } from '../../img/icon/Arrow-right.svg';
import { ReactComponent as CheckMark } from '../../img/icon/check-mark.svg';
import { ReactComponent as EyeOpen } from '../../img/icon/Eye-open.svg';
import { ReactComponent as EyeClosed } from '../../img/icon/EyeClosed.svg';
import { schemaFirstStep } from '../../yup/schemes';

import './register.css';

// eslint-disable-next-line complexity
export const StepOne = ({ authData, setAuthData, setAuthStep }) => {
  const [loginBlur, setLoginBlure] = useState(true);
  const [passwordBlur, setPasswordBlure] = useState(true);
  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [openEye, setOpenEye] = useState(false);
  const [passwordPassed, setPasswordPassed] = useState(false);
  const [visibleLoginLabel, setVisibleLoginLabel] = useState(false);
  const [visiblePasswordLabel, setVisiblePasswordLabel] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaFirstStep),
  });

  const passwordverifi = watch('password');
  const loginWatcher = watch('username');

  const onSubmitStepOne = (data) => {
    setAuthData(Object.assign(authData, data));
    setAuthStep(2);
  };

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

  return (
    <div className='conteiner'>
      <h4 className='registration-label'>Регистрация</h4>
      <p className='steps'>1 шаг из 3</p>
      <form data-test-id='register-form' onSubmit={handleSubmit(onSubmitStepOne)}>
        <div className='login-input'>
          {visibleLoginLabel && (
            <label className='label-in-form' htmlFor='login'>
              Придумайте логин для входа
            </label>
          )}
          <input
            name='username'
            ref={register}
            className={
              visibleLoginLabel
                ? errors?.username?.message
                  ? 'input-in-form-width-label-error'
                  : 'input-in-form-width-label'
                : errors?.username?.message
                ? 'input-in-form-error'
                : 'input-in-form'
            }
            placeholder='Придумайте логин для входа'
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

        {!errors?.username?.message && (
          <div data-test-id='hint' className='input-helper'>
            Используйте для логина латинский алфавит и цифры
          </div>
        )}
        {errors?.username?.message && loginBlur && loginWatcher?.length > 0 && (
          <div data-test-id='hint' className='error-input'>
            Используйте для логина латинский алфавит и цифры
          </div>
        )}
        {errors?.username?.message && loginBlur && loginWatcher?.length < 1 && (
          <div data-test-id='hint' className='error-input'>
            Поле не может быть пустым
          </div>
        )}
        {errors?.username?.message &&
          !loginBlur &&
          (errors?.username?.message === 'срич' ||
            errors?.username?.message === 'ср' ||
            errors?.username?.message === 'сринч' ||
            errors?.username?.message === 'нсб' ||
            errors?.username?.message === 'нсч') && (
            <div data-test-id='hint' className='input-helper'>
              Используйте для логина
              <span
                className={
                  errors?.username?.message === 'срич' ||
                  errors?.username?.message === 'ср' ||
                  errors?.username?.message === 'сринч' ||
                  errors?.username?.message === 'нсб'
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
                  errors?.username?.message === 'нсч' || errors?.username?.message === 'сринч'
                    ? 'custom-error-input'
                    : ''
                }
              >
                цифры
              </span>
            </div>
          )}
        {errors?.username?.message && !loginBlur && errors?.username?.message === 'о' && (
          <div data-test-id='hint' className='input-helper'>
            Используйте для логина латинский алфавит и цифры
          </div>
        )}
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
            placeholder='Пороль'
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
        {!errors?.password?.message && (
          <div data-test-id='hint' className='input-helper'>
            Пароль не менее 8 символов, с заглавной буквой и цифрой
          </div>
        )}

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
        {errors?.password?.message && !passwordBlur && (
          <div data-test-id='hint' className='input-helper'>
            Пороль
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

        <button
          className='submit-button'
          disabled={
            (errors?.password?.message && !passwordFocus) || (!loginFocus && errors?.username?.message) ? true : false
          }
          value='следующий шаг'
          type='submit'
        >
          СЛЕДУЮЩИЙ ШАГ
        </button>
      </form>
      <div className='form-footer'>
        <p className='question-form'>Есть учетная запись?</p>
        <Link className='link-in-form' to='/auth'>
          ВОЙТИ <ArrowRight className='arrow-in-form' />
        </Link>
      </div>
    </div>
  );
};
