import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../api/firebase';
import { type Product } from '../types/Product';
import ProductCard from './ProductCard';

const Products: React.FC = () => {
  const { isLoading, isError, data: products } = useQuery(['products'], getProducts);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <ul className='grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg-grid-cols-4'>
      {products.length > 0 && products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
    </ul>
  );
};

export default Products;
