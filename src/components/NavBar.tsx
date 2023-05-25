import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NavBar = (): JSX.Element => {
  return (
    <header>
      <Link to='/'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav>
        <Link to='/products'>Product</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/products/new'>
          <BsFillPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
};

export default NavBar;
