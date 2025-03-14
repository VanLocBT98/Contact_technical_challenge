import { ApiService } from '~/shares/services/common/api.service';

enum EXAMPLE_ENDPOINT {
  Contact = '/olympic-winners.json'
}

export const contactService = {
  contact: async (): Promise<unknown> => {
    const res = await ApiService.get(EXAMPLE_ENDPOINT.Contact);
    return res.data;
  }
};
