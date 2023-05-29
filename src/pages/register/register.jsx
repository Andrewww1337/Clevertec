import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../../components/loader';
import { getRegistration, getRegistrationFailure, getRegistrationSuccess } from '../../features/registration';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getRegistrationState } from '../../redux/selectors';

import { StepOne } from './step-one';
import { StepThree } from './step-three';
import { StepTwo } from './step-two';

import './register.css';

export const Register = () => {
  const [authStep, setAuthStep] = useState(1);
  const [authData, setAuthData] = useState({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registration = useAppSelector(getRegistrationState);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/books/all');
    }
  }, [navigate]);

  const returnRegistration = () => {
    setAuthStep(1);
    setAuthData({});
    dispatch(getRegistrationFailure(null));
  };

  const repeatRegistration = () => {
    dispatch(getRegistration(authData));
  };

  const onEnter = () => {
    dispatch(getRegistrationSuccess(null));
    navigate('/auth');
  };

  return (
    <div data-test-id='auth' className='registration-page'>
      {registration.isLoading === 'pending' && (
        <div data-test-id='loader'>
          <Loader />
        </div>
      )}

      <h3 className='companyLogo'>Cleverland</h3>
      {authStep === 1 && !registration.error && !registration.content && (
        <StepOne setAuthData={setAuthData} setAuthStep={setAuthStep} authData={authData} />
      )}
      {authStep === 2 && !registration.error && !registration.content && (
        <StepTwo setAuthData={setAuthData} setAuthStep={setAuthStep} authData={authData} />
      )}
      {authStep === 3 && !registration.error && !registration.content && (
        <StepThree setAuthData={setAuthData} authData={authData} />
      )}
      {registration.content && (
        <div data-test-id='status-block' className='modal-conteiner'>
          <h4 className='form-label'>Регистрация успешна</h4>
          <p className='modal-message'>
            Регистрация прошла успешно. Зайдите в личный кабинет,используя свой логин и пароль
          </p>

          <button
            type='button'
            className='submit-button'
            onClick={() => {
              onEnter();
            }}
          >
            вход
          </button>
        </div>
      )}
      {registration.error === 'Request failed with status code 400' && (
        <div data-test-id='status-block' className='modal-conteiner'>
          <h4 className='form-label'>Данные не сохранились</h4>
          <p className='modal-message'>
            Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail
          </p>

          <button
            className='submit-button'
            onClick={() => {
              returnRegistration();
            }}
            type='button'
          >
            <p>НАЗАД К РЕГИСТРАЦИИ</p>
          </button>
        </div>
      )}
      {registration.error && registration.error !== 'Request failed with status code 400' && (
        <div data-test-id='status-block' className='modal-conteiner'>
          <h4 className='form-label'>Данные не сохранились</h4>
          <p className='modal-message'>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</p>

          <button
            className='submit-button'
            onClick={() => {
              repeatRegistration();
            }}
            type='button'
          >
            <p>Повторить</p>
          </button>
        </div>
      )}
    </div>
  );
};
