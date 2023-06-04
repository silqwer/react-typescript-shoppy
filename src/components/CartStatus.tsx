import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getCart } from '../api/firebase';
import { type ShoppyUser } from '../types/User';
import { useAuthContext } from './context/AuthContext';

const CartStatus: React.FC = () => {
  const { user } = useAuthContext();
  const { uid } = user as ShoppyUser;
  const { data: products } = useQuery(['carts'], async () => await getCart(uid));
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
