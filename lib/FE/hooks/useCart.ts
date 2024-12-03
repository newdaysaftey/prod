"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, updateCartItemQuantity, removeCartItem } from '@/lib/FE/api';
import { toast } from 'sonner';

export function useCart() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItemQuantity(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart updated successfully');
    },
    onError: () => {
      toast.error('Failed to update cart');
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed from cart');
    },
    onError: () => {
      toast.error('Failed to remove item');
    },
  });

  return {
    cart: data?.data,
    isLoading,
    error,
    updateQuantity: (itemId: string, quantity: number) =>
      updateQuantityMutation.mutate({ itemId, quantity }),
    removeItem: (itemId: string) => removeItemMutation.mutate(itemId),
    isUpdating: updateQuantityMutation.isPending,
    isRemoving: removeItemMutation.isPending,
  };
}