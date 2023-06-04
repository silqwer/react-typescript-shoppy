import React from 'react';

interface Props {
  text: string;
  price: number;
}

const PriceCard: React.FC<Props> = ({ text, price }) => {
  return (
    <div className='p-8 mx-2 text-lg text-center bg-gray-50 rounded-2xl md:text-xl'>
      <p>{text}</p>
      <p className='text-xl font-bold text-brand md:text2xl'>{price}</p>
    </div>
  );
};

export default PriceCard;
