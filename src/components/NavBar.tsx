import { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import { type ShoppyUser } from '../types/User';
import Button from './common/Button';
import UserAvatar from './UserAvatar';

const NavBar: React.FC = () => {
  const [user, setUser] = useState<undefined | ShoppyUser>(undefined);
  const handleLogin = (): void => {
    login().catch((error) => {
      console.error(error);
    });
  };
  const handleLogout = (): void => {
    logout().catch((error) => {
      console.error(error);
    });
  };

  const isAdmin = (user: ShoppyUser): JSX.Element => {
    if (user.isAdmin) {
      return (
        <Link to='/products/new' className='text-2xl'>
          <BsFillPencilFill />
        </Link>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className='flex justify-between p-2 border-b border-gray-300'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Product</Link>
        <Link to='/cart'>Cart</Link>

        {user !== undefined && isAdmin(user)}

        {user !== undefined ? (
          <>
            <UserAvatar user={user} />
            <Button text='Logout' onClick={handleLogout} />
          </>
        ) : (
          <Button text='Login' onClick={handleLogin} />
        )}
      </nav>
    </header>
  );
};

export default NavBar;
