import {
  type UseMutationResult,
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../components/context/AuthContext';
import { type CartItem } from '../types/CartItem';

export const useCart = (): {
  cartQuery: UseQueryResult<CartItem[], unknown>;
  addOrUpdateItem: UseMutationResult<void, unknown, CartItem, unknown>;
  removeItem: UseMutationResult<void, unknown, string, unknown>;
} => {
  const { user } = useAuthContext();
  const uid = user?.uid ?? '';
  const queryClient = useQueryClient();

  const cartQuery = useQuery(['carts', uid], async () => await getCart(uid), {
    enabled: uid !== ''
  });

  const addOrUpdateItem = useMutation(
    async (product: CartItem) => {
      await addOrUpdateToCart(uid, product);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['carts', uid]).catch(console.error);
      }
    }
  );

  const removeItem = useMutation(
    async (id: string) => {
      await removeFromCart(uid, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['carts', uid]).catch(console.error);
      }
    }
  );

  return { cartQuery, addOrUpdateItem, removeItem };
};
