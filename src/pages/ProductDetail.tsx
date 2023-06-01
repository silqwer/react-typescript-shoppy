import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/common/Button';

const ProductDetail: React.FC = () => {
  const {
    state: { image, title, category, price, options, description }
  } = useLocation();

  const [selected, setSelected] = useState<string>('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelected(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log('ddd');
  };

  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <img src={image} alt={title} />
      <section className='flex flex-col p-4 md:flex-row'>
        <div className='flex flex-col w-full p-4 basis-5/12'>
          <h2 className='py-2 text-3xl font-bold'>{title}</h2>
          <p className='py-2 text-2xl font-bold border-b border-gray-400'>🇰🇷{price}</p>
          <p className='py-4 text-lg'>{description}</p>
          {Object.keys(options).length > 0 && (
            <div className='flex items-center'>
              <label className='font-bold text-brend' htmlFor='select'>
                옵션:
              </label>
              <select
                className='flex-1 m-4 border-2 border-dashed outline-none p2 border-brand'
                id='select'
                onChange={handleSelect}
                value={selected}
              >
                {Object.keys(options).map((key) => (
                  <option key={key}>{options[key]}</option>
                ))}
              </select>
            </div>
          )}
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
