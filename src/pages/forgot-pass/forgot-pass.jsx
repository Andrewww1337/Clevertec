import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Loader } from '../../components/loader';
import { getForgot } from '../../features/forgot';
import { getRecovery, getRecoveryFailure, getRecoverySuccess } from '../../features/recovery';
import { ReactComponent as ArrowRight } from '../../img/icon/Arrow-right.svg';
import { ReactComponent as CheckMark } from '../../img/icon/check-mark.svg';
import { ReactComponent as EyeOpen } from '../../img/icon/Eye-open.svg';
import { ReactComponent as EyeClosed } from '../../img/icon/EyeClosed.svg';
import { ReactComponent as ArrowLeft } from '../../img/icon/left-arrow.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getForgotState, getRecoveryState } from '../../redux/selectors';
import { schemaForgotPass, schemaRecoveryPass } from '../../yup/schemes';

import '../auth/auth.css';

// eslint-disable-next-line complexity
export const ForgotPass = () => {
  const [emailBlur, setEmailBlur] = useState(true);
  const [passwordBlur, setPasswordBlur] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordConfirmBlur, setPasswordConfirmBlur] = useState(true);
  const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);
  const [openEye, setOpenEye] = useState(false);
  const [openConfirmEye, setOpenConfirmEye] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [visiblePasswordLabel, setVisiblePasswordLabel] = useState(false);
  const [visibleConfirmPasswordLabel, setVisibleConfirmPasswordLabel] = useState(false);
  const [passwordPassed, setPasswordPassed] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [visibleEmailLabel, setVisibleEmailLabel] = useState(false);

  const forgot = useAppSelector(getForgotState);
  const recovery = useAppSelector(getRecoveryState);

  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, reset, errors } = useForm({
    mode: 'all',
    resolver: yupResolver(search ? schemaForgotPass : schemaRecoveryPass),
  });
  const onSubmitConfirm = (data) => {
    dispatch(getRecovery({ code: search.slice(6), ...data }));
    reset();
  };
  const emailWatcher = watch('email');
  const passwordverifi = watch('password');
  const passwordverifiConfirm = watch('passwordConfirmation');

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/books/all');
    }
  }, [navigate]);

  useEffect(() => {
    if (emailWatcher?.length > 0 || emailFocus) {
      setVisibleEmailLabel(true);
    } else {
      setVisibleEmailLabel(false);
    }
    if (passwordverifi?.length > 0 || passwordFocus) {
      setVisiblePasswordLabel(true);
    } else {
      setVisiblePasswordLabel(false);
    }
    if (passwordverifiConfirm?.length > 0 || passwordConfirmFocus) {
      setVisibleConfirmPasswordLabel(true);
    } else {
      setVisibleConfirmPasswordLabel(false);
    }
    if (
      passwordverifi?.length > 7 &&
      passwordverifi?.toLowerCase() !== passwordverifi &&
      passwordverifi?.match(/[0-9]/i)
    ) {
      setPasswordPassed(true);
    } else {
      setPasswordPassed(false);
    }

    if (passwordverifi === passwordverifiConfirm) {
      setPasswordsMatch(true);
    } else if (passwordConfirmBlur && passwordBlur && passwordverifiConfirm?.length > 0) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }, [
    emailFocus,
    emailWatcher,
    passwordBlur,
    passwordConfirmBlur,
    passwordConfirmFocus,
    passwordFocus,
    passwordPassed,
    passwordsMatch,
    passwordverifi,
    passwordverifiConfirm,
    visibleConfirmPasswordLabel,
    visibleEmailLabel,
    visiblePasswordLabel,
  ]);
  const onSubmit = (data) => {
    dispatch(getForgot(data));
  };

  const onPressEnter = () => {
    dispatch(getRecoverySuccess(null));
    navigate('/auth');
  };

  const onPressRepeat = () => {
    dispatch(getRecoveryFailure(null));
    setVisibleConfirmPasswordLabel(false);
    setVisiblePasswordLabel(false);
  };

  return (
    <div data-test-id='auth' className='form-page'>
      {forgot.isLoading === 'pending' && (
        <div data-test-id='loader'>
          <Loader />
        </div>
      )}
      {recovery.isLoading === 'pending' && (
        <div data-test-id='loader'>
          <Loader />
        </div>
      )}
      <h3 className='companyLogo'>Cleverland</h3>
      {search && !recovery.content && !recovery.error && (
        <div className='conteiner'>
          <h4 className='form-label'>Восстановление пароля</h4>

          <form data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmitConfirm)}>
            <div className='password-input'>
              {visiblePasswordLabel && (
                <label className='label-in-form' htmlFor='password'>
                  Новый пароль
                </label>
              )}
              <input
                className={visiblePasswordLabel ? 'input-in-form-width-label' : 'input-in-form'}
                placeholder='Новый пароль'
                name='password'
                ref={register}
                onBlur={() => {
                  setPasswordBlur(true);
                  setPasswordFocus(false);
                }}
                onFocus={() => {
                  setPasswordFocus(true);
                }}
                onChange={() => {
                  if (passwordBlur) {
                    setPasswordBlur(false);
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
            {errors?.password?.message && errors?.password?.message !== 'о' && passwordBlur && (
              <div data-test-id='hint' className='error-input'>
                <span>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
              </div>
            )}
            {errors?.password?.message === 'о' && passwordBlur && (
              <div data-test-id='hint' className='error-input'>
                Поле не может быть пустым
              </div>
            )}
            {errors?.password?.message && !passwordBlur && (
              <div data-test-id='hint' className='input-helper'>
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

            <div className='password-input'>
              {visibleConfirmPasswordLabel && (
                <label className='label-in-form' htmlFor='passwordConfirm'>
                  Повторите пароль
                </label>
              )}
              <input
                className={visibleConfirmPasswordLabel ? 'input-in-form-width-label' : 'input-in-form'}
                placeholder='Повторите пароль'
                name='passwordConfirmation'
                ref={register}
                onBlur={() => {
                  setPasswordConfirmBlur(true);
                  setPasswordConfirmFocus(false);
                }}
                onFocus={() => {
                  setPasswordConfirmFocus(true);
                }}
                onChange={() => {
                  if (passwordConfirmBlur) {
                    setPasswordConfirmBlur(false);
                  }
                }}
                type={openConfirmEye ? 'text' : 'password'}
              />

              <button
                type='button'
                data-test-id='button-search-close'
                onClick={() => {
                  setOpenConfirmEye(!openConfirmEye);
                }}
                className='eye'
                aria-hidden='true'
              >
                {openConfirmEye && <EyeOpen data-test-id='eye-opened' />}
                {!openConfirmEye && <EyeClosed data-test-id='eye-closed' />}
              </button>
            </div>
            {!errors?.passwordConfirmation?.message && passwordsMatch && (
              <div data-test-id='hint' className='input-helper' />
            )}
            {errors?.passwordConfirmation?.message === 'о' && (
              <div data-test-id='hint' className='error-input'>
                Поле не может быть пустым
              </div>
            )}
            {!errors?.passwordConfirmation?.message && !passwordsMatch && (
              <div data-test-id='hint' className='error-input'>
                Пароли не совпадают
              </div>
            )}

            <button
              className='submit-button'
              value='сохранить изменения'
              disabled={passwordsMatch ? false : true}
              type='submit'
            >
              СОХРАНИТЬ ИЗМЕНЕНИЯ
            </button>
          </form>
          <div className='form-footer'>
            <p className='question-form'>После сохранения войдите в библиотеку, используя новый пароль</p>
          </div>
        </div>
      )}
      {search && recovery.content && !recovery.error && (
        <div data-test-id='status-block' className='modal-conteiner'>
          <h4 className='form-label'>Новые данные сохранены</h4>
          <p className='modal-message'>Зайдите в личный кабинет, используя свой логин и новый пароль</p>

          <button
            className='submit-button'
            onClick={() => {
              onPressEnter();
            }}
            type='button'
          >
            <p>ВХОД</p>
          </button>
        </div>
      )}
      {search && !recovery.content && recovery.error && (
        <div data-test-id='status-block' className='modal-conteiner'>
          <h4 className='form-label'>Данные не сохранились</h4>
          <p className='modal-message'>Что-то пошло не так.Поробуйте еще раз</p>

          <button
            className='submit-button'
            onClick={() => {
              onPressRepeat();
            }}
            type='button'
          >
            <p>ПОВТОРИТЬ</p>
          </button>
        </div>
      )}

      {!search && forgot.content === null && (
        <div className='recovery-form'>
          <div className='navigate-in-form'>
            <Link to='/auth'>
              <ArrowLeft className='arrowLeft' />
            </Link>{' '}
            <p>Вход в личный кабинет</p>
          </div>
          <div className='conteiner-special'>
            <h4 className='form-label'>Восстановление пароля</h4>
            <form data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}>
              <div className='login-input'>
                {visibleEmailLabel && (
                  <label className='label-in-form' htmlFor='email'>
                    Email
                  </label>
                )}
                <input
                  name='email'
                  ref={register}
                  className={visibleEmailLabel ? 'input-in-form-width-label' : 'input-in-form'}
                  placeholder='Email'
                  onBlur={() => {
                    setEmailBlur(true);
                    setEmailFocus(false);
                  }}
                  onFocus={() => {
                    setEmailFocus(true);
                  }}
                  onChange={() => {
                    if (emailBlur) {
                      setEmailBlur(false);
                    }
                  }}
                  type='text'
                />
              </div>
              {errors?.email?.message && errors?.email?.message !== 'о' && emailBlur && (
                <div data-test-id='hint' className='error-input-helper'>
                  {' '}
                  Введите корректный e-mail
                </div>
              )}
              {errors?.email?.message === 'о' && emailBlur && (
                <div data-test-id='hint' className='error-input-helper'>
                  Поле не может быть пустым
                </div>
              )}
              {forgot.error && (
                <div data-test-id='hint' className='error-input-helper'>
                  error
                </div>
              )}
              <div className='input-helper'>
                На это email будет отправлено письмо с инструкциями по восстановлению пароля
              </div>

              <button className='submit-button' value='восстановить' type='submit'>
                ВОССТАНОВИТЬ
              </button>
            </form>
            <div className='form-footer'>
              <p className='question-form'>Нет учетной записи?</p>
              <Link className='link-in-form' to='/registration'>
                РЕГИСТРАЦИЯ <ArrowRight className='arrow-in-form' />
              </Link>
            </div>
          </div>
        </div>
      )}
      {forgot.content === true && (
        <div data-test-id='status-block' className='modal-conteiner'>
          <h4 className='form-label'>Письмо выслано</h4>
          <p className='modal-message'>
            Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
          </p>
        </div>
      )}
    </div>
  );
};
