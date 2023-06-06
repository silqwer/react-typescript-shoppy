import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useCart } from '../hooks/useCart';
import { type CartItem as ProductInCard } from '../types/CartItem';

interface Props {
  product: ProductInCard;
  uid: string;
}

const ICON_CLASS = 'mx-1 transition-all cursor-pointer hover:text-brand hover:scale-105';

const CartItem: React.FC<Props> = ({ product, uid }) => {
  const { id, image, title, option, quantity, price } = product;
  const { addOrUpdateItem, removeItem } = useCart();
  const handleMinus = (): void => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = (): void => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };
  const handleDelete = (): void => {
    removeItem.mutate(id);
  };

  return (
    <li className='flex items-center justify-between my-2'>
      <img className='w-24 rounded-lg md:w48' src={image} alt={title} />
      <div className='flex justify-between flex-1 ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{title}</p>
          <p className='text-xl font-bold text-brend'>{option}</p>
          <p>🇰🇷{price}</p>
        </div>
        <div className='flex items-center text-2xl'>
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
