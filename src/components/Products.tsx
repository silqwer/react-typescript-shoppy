import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { type Product } from '../types/Product';
import ProductCard from './ProductCard';

const Products: React.FC = () => {
  const {
    productsQuery: { isLoading, isError, data: products }
  } = useProducts();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <ul className='grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg-grid-cols-4'>
      {products !== undefined ? (
        products.map((product: Product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <li>제품이 없습니다.</li>
      )}
    </ul>
  );
};

export default Products;
