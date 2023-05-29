import { ReactComponent as CheckCircle } from '../../img/icon/CheckCircle.svg';
import { ReactComponent as Cross } from '../../img/icon/error-cross.svg';
import { ReactComponent as WarningCircle } from '../../img/icon/WarningCircle.svg';

import './add-photo-allert.css';

export const PhotoAllert = ({ open, info, text }) => (
  <div data-test-id='error' className={info ? 'review-success-window profile-add' : 'review-error-window profile-add'}>
    <div className='warning-title'>
      {info ? <CheckCircle /> : <WarningCircle />}

      <p>{text}</p>
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
