import { ReactComponent as Cross } from '../../img/icon/error-cross.svg';
import { ReactComponent as WarningCircle } from '../../img/icon/WarningCircle.svg';

import './error-window.css';

export const ErrorWindow = () => (
  <div className='error-window'>
    <div className='warning-title'>
      <WarningCircle />
      <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>
    </div>
    <Cross />
  </div>
);
