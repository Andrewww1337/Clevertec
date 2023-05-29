import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactComponent as ArrowRight } from '../../img/icon/Arrow-right.svg';
import { schemaSecontStep } from '../../yup/schemes';

import './register.css';

// eslint-disable-next-line complexity
export const StepTwo = ({ authData, setAuthData, setAuthStep }) => {
  const [nameBlur, setNameBlure] = useState(true);
  const [lastNameBlur, setLastNameBlure] = useState(true);
  const [nameFocus, setNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [visibleNameLabel, setVisibleNameLabel] = useState(false);
  const [visibleLastNameLabel, setVisibleLastNameLabel] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSecontStep),
  });

  const nameWatcher = watch('firstName');
  const lastNameWatcher = watch('lastName');

  const onSubmitStepTwo = (data) => {
    setAuthData(Object.assign(authData, data));
    setAuthStep(3);
  };

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

  return (
    <div className='conteiner'>
      <h4 className='registration-label'>Регистрация</h4>
      <p className='steps'>2 шаг из 3</p>
      <form data-test-id='register-form' onSubmit={handleSubmit(onSubmitStepTwo)}>
        <div className='login-input'>
          {visibleNameLabel && (
            <label className='label-in-form' htmlFor='name'>
              Имя
            </label>
          )}
          <input
            className={
              visibleNameLabel
                ? errors?.firstName?.message
                  ? 'input-in-form-width-label-error'
                  : 'input-in-form-width-label'
                : errors?.firstName?.message
                ? 'input-in-form-error'
                : 'input-in-form'
            }
            placeholder='Имя'
            name='firstName'
            ref={register}
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
        <div className='login-input'>
          {visibleLastNameLabel && (
            <label className='label-in-form' htmlFor='lastName'>
              Фамилия
            </label>
          )}
          <input
            className={
              visibleLastNameLabel
                ? errors?.lastName?.message
                  ? 'input-in-form-width-label-error'
                  : 'input-in-form-width-label'
                : errors?.lastName?.message
                ? 'input-in-form-error'
                : 'input-in-form'
            }
            placeholder='Фамилия'
            ref={register}
            name='lastName'
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
        <button
          className='submit-button'
          disabled={
            (errors?.firstName?.message && !nameFocus) || (!lastNameFocus && errors?.lastName?.message) ? true : false
          }
          value='последний шаг'
          type='submit'
        >
          ПОСЛЕДНИЙ ШАГ
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
