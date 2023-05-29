import { ReactComponent as Facebook } from '../../img/icon/icon-facebook.svg';
import { ReactComponent as Instagram } from '../../img/icon/icon-instagram.svg';
import { ReactComponent as Linkedin } from '../../img/icon/icon-linkedin.svg';
import { ReactComponent as Vk } from '../../img/icon/icon-vk.svg';

import './footer-component.css';

export const Footer = () => (
  <div className='footer'>
    <div className='footer-title'>
      <p>© 2020-2023 Cleverland.</p>
      <p> Все права защищены.</p>
    </div>
    <div className='icon-social'>
      <Facebook />
      <Instagram />
      <Vk />
      <Linkedin />
    </div>
  </div>
);
