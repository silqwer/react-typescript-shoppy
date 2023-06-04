import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult
} from '@tanstack/react-query';
import { getProducts as getProductsApi, addNewProduct } from '../api/firebase';
import { type NewProduct, type Product } from '../types/Product';

interface MutationArgs {
  product: NewProduct;
  url: string;
}

export const useProducts = (): {
  productsQuery: UseQueryResult<Product[], unknown>;
  addProduct: UseMutationResult<void, unknown, MutationArgs, unknown>;
} => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(['products'], getProductsApi, {
    staleTime: 1000 * 60
  });

  const addProduct = useMutation(
    async ({ product, url }: MutationArgs) => {
      await addNewProduct(product, url);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['products']);
      }
    }
  );

  return { productsQuery, addProduct };
};
