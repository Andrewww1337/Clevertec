import { useNavigate } from 'react-router-dom';

import userIcon from '../../img/avatars/cat.svg';
import { useAppSelector } from '../../redux/hooks';
import { getUserState } from '../../redux/selectors';

import './user-card.css';

export const UserCard = ({ menuControlOpen, setMenuControlOpen }) => {
  const navigate = useNavigate();
  const user = useAppSelector(getUserState);

  return (
    <section className='user-card'>
      <p>Привет, {user.content?.firstName}!</p>
      <button
        type='button'
        onClick={() => {
          setMenuControlOpen(!menuControlOpen);
        }}
        className='fa-button'
      >
        <img className='user-avatar-in-header' src={user.content?.avatar ? user.content.avatar : userIcon} alt='no' />
      </button>

      {menuControlOpen && (
        <div className='user-log-control'>
          <button
            onClick={() => {
              navigate('/profile');
              setMenuControlOpen(false);
            }}
            className='logOutbutton'
            data-test-id='profile-button'
            type='button'
          >
            <h5>Профиль</h5>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('jwt');
              navigate('/auth');
              setMenuControlOpen(false);
            }}
            className='logOutbutton'
            type='button'
          >
            <h5>Выход</h5>
          </button>
        </div>
      )}
    </section>
  );
};
