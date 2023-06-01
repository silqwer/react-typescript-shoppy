import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product } from '../types/Product';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, image, title, category, price } = product;
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, {
          state: product
        });
      }}
      className='overflow-hidden transition-all rounded-lg shadow-md cursor-pointer'
    >
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
