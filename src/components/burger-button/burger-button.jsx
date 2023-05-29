import { useState } from 'react';

import { BurgerMenu } from '../burger-menu';

import './burger-button.css';

export const BurgerButton = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <button
      data-test-id='burger-navigation'
      className='burger-button'
      type='button'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='for-test'>
        <button
          type='button'
          data-test-id='button-burger'
          className={menuActive ? 'cmn-toggle-switch-rot active cmn-toggle-switch' : 'cmn-toggle-switch'}
          onClick={() => setMenuActive(!menuActive)}
        >
          <span>menu</span>
        </button>
      </div>
      <BurgerMenu activ={menuActive} setActive={setMenuActive} />
    </button>
  );
};
