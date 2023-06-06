import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '../hooks/useCart';

const CartStatus: React.FC = () => {
  const { cartQuery } = useCart();
  const { data: products } = cartQuery;
  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl' />
      {products !== undefined && (
        <p className='absolute w-6 h-6 font-bold text-center text-white rounded-full bg-brand -top-1 -right-2'>
          {products.length}
        </p>
      )}
    </div>
  );
};

export default CartStatus;
