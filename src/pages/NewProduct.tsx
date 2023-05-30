import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/common/Button';

interface Product {
  file: File | null;
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
}

const NewProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    file: null,
    title: '',
    price: 0,
    category: '',
    description: '',
    options: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = event.target;

    if (name === 'file' && files !== null) {
      setFile(files[0]);
      return;
    }

    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsUploading(true);
    if (file !== null) {
      uploadImage(file)
        .then((url) => {
          console.log(url);
          addNewProduct(product, url)
            .then(() => {
              setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
              }, 4000);
            })
            .catch(console.error);
        })
        .finally(() => {
          setIsUploading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <section className='w-full text-center'>
      <h2 className='my-4 text-2xl font-bold'>새로운 제품 등록</h2>
      {success && <p className='my-2'>✅ 성공적으로 제품이 추가되었습니다.</p>}
      {file !== null && <img className='mx-auto w-96 mb-b' src={URL.createObjectURL(file)} alt='local file' />}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? 0}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='제품 설명'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
};

export default NewProduct;
