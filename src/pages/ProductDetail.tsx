import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/common/Button';
import { useCart } from '../hooks/useCart';

const ProductDetail: React.FC = () => {
  const {
    state: { id, image, title, category, price, options, description }
  } = useLocation();

  const [selected, setSelected] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { addOrUpdateItem } = useCart();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelected(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.');
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }
    });
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
          {success !== '' && <p className='my-2'>{success}</p>}
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
