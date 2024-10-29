import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useExampleStore } from '@/store/example.store';

const API_URL = '/api/example';

export const useExample = () => {
  const queryClient = useQueryClient();
  const { setError } = useExampleStore();

  const fetchExamples = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

  const createExample = async (data: any) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create data');
    }
    return response.json();
  };

  const query = useQuery({
    queryKey: ['examples'],
    queryFn: fetchExamples,
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const mutation = useMutation({
    mutationFn: createExample,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    create: mutation.mutate,
    isCreating: mutation.isPending,
  };
};