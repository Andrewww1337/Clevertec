import { ReactComponent as CheckCircle } from '../../img/icon/CheckCircle.svg';
import { ReactComponent as Cross } from '../../img/icon/error-cross.svg';
import { ReactComponent as WarningCircle } from '../../img/icon/WarningCircle.svg';

import './review-allert.css';

export const ReviewAllert = ({ open, info }) => (
  <div data-test-id='error' className={info ? 'review-success-window' : 'review-error-window'}>
    <div className='warning-title'>
      {info ? <CheckCircle /> : <WarningCircle />}

      {info ? <p>Спасибо, что нашли время оценить книгу!</p> : <p>Оценка не была отправлена. Попробуйте позже!</p>}
    </div>
    <button
      data-test-id='alert-close'
      className='button-review-allert'
      onClick={() => {
        open(false);
      }}
      type='button'
    >
      <Cross />
    </button>
  </div>
);
