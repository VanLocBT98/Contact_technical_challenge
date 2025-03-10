import { useQuery } from '@tanstack/react-query';

import { contactService } from '~/services/contact/index.service';

export const useOlympicData = () => {
  return useQuery({
    queryKey: ['olympicData'],
    queryFn: contactService.contact,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false
  });
};
