import { ApiService } from '~/services/common/api.service';

enum EXAMPLE_ENDPOINT {
  Contact = '/a6bbe633-1745-4b11-94c6-fcabde72ef53',
}

export const contactService = {
  contact: async (data: any): Promise<unknown> => {
    const res = await ApiService.post(EXAMPLE_ENDPOINT.Contact, data);
    return res.data;
  }
};