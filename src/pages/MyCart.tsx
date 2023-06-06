import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import Button from '../components/common/Button';
import { useAuthContext } from '../components/context/AuthContext';
import PriceCard from '../components/PriceCard';
import { useCart } from '../hooks/useCart';
import { type CartItem as ProductInCart } from '../types/CartItem';
import { type ShoppyUser } from '../types/User';

const SHIPPING = 3000;

const MyCart: React.FC = () => {
  const { user } = useAuthContext();
  const { uid } = user as ShoppyUser;
  const { cartQuery } = useCart();
  const { isLoading, data: products } = cartQuery;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const hasProducts = products !== undefined && products.length > 0;
  const totalPrice: number =
    products === undefined
      ? 0
      : products.reduce((prev: number, current: ProductInCart) => prev + current.price * current.quantity, 0);

  return (
    <section className='flex flex-col p-8'>
      <p className='text-2xl font-bold text-center border-b pd-4'>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>}
      {hasProducts && (
        <>
          <ul className='px-8 mb-8 border-b border-gray-300 p4'>
            {products.length > 0 &&
              products.map((product) => <CartItem key={product.id} product={product} uid={uid} />)}
          </ul>
          <div className='flex items-center justify-between p-2 mb-6 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalPrice + SHIPPING} />
          </div>
          <Button text='주문하기' />
        </>
      )}
    </section>
  );
};

export default MyCart;
