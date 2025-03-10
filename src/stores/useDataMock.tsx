import { create } from 'zustand';

import { IOlympicData } from '~/types';

export interface DataMockState {
  list: IOlympicData[];
  loading: boolean;
  error: string | null;
  fetchOlympicData: (data: IOlympicData[]) => void;
}

export const useDataMockStore = create<DataMockState>((set) => ({
  list: [],
  loading: false,
  error: null,
  fetchOlympicData: (data) => set(() => ({ list: data }))
}));
