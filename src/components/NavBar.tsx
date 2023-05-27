import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { login } from '../api/firebase';

const NavBar = (): JSX.Element => {
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
        <button onClick={login}>Login</button>
      </nav>
    </header>
  );
};

export default NavBar;
