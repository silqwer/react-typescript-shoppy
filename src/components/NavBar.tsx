import { type User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';

const NavBar: React.FC = () => {
  const [user, setUser] = useState<undefined | User>(undefined);
  const handleLogin = (): void => {
    login()
      .then(setUser)
      .catch((error) => {
        console.error(error);
      });
  };
  const handleLogout = (): void => {
    logout()
      .then(setUser)
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    onUserStateChange((user: User) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <header className='flex justify-between p-2 border-b border-gray-300'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex gap-4 font-semibold item-center'>
        <Link to='/products'>Product</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/products/new' className='text-2xl'>
          <BsFillPencilFill />
        </Link>

        {user !== undefined ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
