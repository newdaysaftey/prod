import { create } from 'zustand';

interface ExampleState {
  data: any[];
  isLoading: boolean;
  error: string | null;
  setData: (data: any[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  data: [],
  isLoading: false,
  error: null,
  setData: (data) => set({ data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));