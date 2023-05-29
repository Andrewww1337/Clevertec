import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { getRegistration } from '../../features/registration';
import { ReactComponent as ArrowRight } from '../../img/icon/Arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getRegistrationState } from '../../redux/selectors';
import { schemaThirdStep } from '../../yup/schemes';

import './register.css';

// eslint-disable-next-line complexity
export const StepThree = ({ authData, setAuthData }) => {
  const [nameNumber, setNameNumber] = useState('phone');
  const [errorNumber, setErrorNumber] = useState(false);
  const [firstAtiveNumber, setFirstAtiveNumber] = useState(false);
  const [numberBlur, setNumberBlure] = useState(true);
  const [emailBlur, setEmailBlure] = useState(true);
  const [numberFocus, setNumberFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [visibleEmailLabel, setVisibleEmailLabel] = useState(false);
  const [visibleNumberLabel, setVisibleNumberLabel] = useState(false);

  const dispatch = useAppDispatch();
  const registration = useAppSelector(getRegistrationState);
  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaThirdStep),
  });
  const emailWatcher = watch('email');
  const numberWatcher = watch('phone');
  const textInput = React.createRef();
  const shortHelper = !errors?.phone?.message && !errorNumber && !firstAtiveNumber && numberWatcher?.length > 0;
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

  const onSubmitStepThree = (data) => {
    setAuthData(Object.assign(authData, data));
    dispatch(getRegistration(authData));
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

  return (
    <div className='conteiner'>
      <h4 className='registration-label'>Регистрация</h4>
      <p className='steps'>3 шаг из 3</p>
      <form data-test-id='register-form' onSubmit={handleSubmit(onSubmitStepThree)}>
        <div className='login-input'>
          {visibleNumberLabel && (
            <label className='label-in-form' htmlFor='number'>
              Номер телефона
            </label>
          )}
          <InputMask
            name={nameNumber === 'phone' ? 'phone' : ''}
            mask='+375 (99) 999-99-99'
            maskPlaceholder='x'
            maskChar='null'
            id='cardNumber'
            className={
              visibleNumberLabel
                ? longErrorRequired ||
                  shortErrorRequired ||
                  requiredFocusInput ||
                  requiredBlurInputError ||
                  requiredShortError ||
                  longErrorFocus ||
                  emptyErrorLong
                  ? 'input-in-form-width-label-error'
                  : 'input-in-form-width-label'
                : longErrorRequired ||
                  shortErrorRequired ||
                  requiredFocusInput ||
                  requiredBlurInputError ||
                  requiredShortError ||
                  longErrorFocus ||
                  emptyErrorLong
                ? 'input-in-form-error'
                : 'input-in-form'
            }
            placeholder='Номер телефона'
            type='numder'
            ref={nameNumber === 'phone' ? register : textInput}
            onBlur={telPhoneOnBlur}
            onFocus={telPhoneOnFocus}
            onChange={telPhoneOnChange}
          />
        </div>
        {shortHelper && (
          <div data-test-id='hint' className='input-helper'>
            В формате +375 (xx) xxx-xx-xx
          </div>
        )}
        {longErrorRequired && (
          <div data-test-id='hint' className='error-input'>
            В формате +375 (xx) xxx-xx-xx
          </div>
        )}
        {shortErrorRequired && (
          <div data-test-id='hint' className='error-input'>
            Поле не может быть пустым
          </div>
        )}
        {requiredFocusInput && (
          <div data-test-id='hint' className='error-input'>
            2Поле не может быть пустым
          </div>
        )}
        {requiredFocusInputHelper && (
          <div data-test-id='hint' className='input-helper'>
            В формате +375 (xx) xxx-xx-xx
          </div>
        )}
        {requiredBlurInputError && (
          <div data-test-id='hint' className='error-input'>
            В формате +375 (xx) xxx-xx-xx
          </div>
        )}
        {requiredShortError && (
          <div data-test-id='hint' className='error-input'>
            Поле не может быть пустым
          </div>
        )}
        {helperFocus && (
          <div data-test-id='hint' className='input-helper'>
            В формате +375 (xx) xxx-xx-xx
          </div>
        )}
        {noEmptyHelper && (
          <div data-test-id='hint' className='input-helper'>
            В формате +375 (xx) xxx-xx-xx
          </div>
        )}
        {longErrorFocus && (
          <div data-test-id='hint' className='error-input'>
            В формате +375 (xx) xxx-xx-xx
          </div>
        )}
        {emptyErrorLong && (
          <div data-test-id='hint' className='error-input'>
            Поле не может быть пустым
          </div>
        )}
        {hasErrorLong && (
          <div data-test-id='hint' className='error-input'>
            Поле не может быть пустым
          </div>
        )}
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
        {errors?.email?.message && errors?.email?.message !== 'о' && emailBlur && (
          <div data-test-id='hint' className='error-input'>
            Введите корректный e-mail
          </div>
        )}
        {errors?.email?.message && errors?.email?.message === 'о' && emailBlur && (
          <div data-test-id='hint' className='error-input'>
            Поле не может быть пустым
          </div>
        )}
        {errors?.email?.message && !emailBlur && <div className='input-helper' />}
        {!errors?.email?.message && <div className='input-helper' />}
        <button
          className='submit-button'
          disabled={
            (errorNumber && !numberFocus) || errors?.phone?.message || (!emailFocus && errors?.email?.message)
              ? true
              : false
          }
          value='зарегистрироваться'
          type='submit'
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </form>
      <div className='form-footer'>
        <p className='question-form'>Есть учетная запись?</p>
        <Link className='link-in-form' to='/auth'>
          ВОЙТИ <ArrowRight className='arrow-in-form' />
        </Link>
        {registration.error && `${registration.error}`}
        {registration.content && `${registration.content}`}
      </div>
    </div>
  );
};
