import React from 'react';
import { type Product } from '../types/Product';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product: { id, image, title, category, price } }) => {
  return (
    <li className='overflow-hidden rounded-lg shadow-md cursor-pointer'>
      <img className='w-full' src={image} alt={title} />
      <div className='flex items-center justify-between px-2 mt-2 text-lg'>
        <h3 className='truncate'>{title}</h3>
        <p>{`🇰🇷${price}`}</p>
      </div>
      <p className='px-2 mb-2 text-gray-600'>{category}</p>
    </li>
  );
};

export default ProductCard;
