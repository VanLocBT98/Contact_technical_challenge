import { ApiService } from '~/services/common/api.service';

enum EXAMPLE_ENDPOINT {
  LIST = 'list',
  DETAIL = 'detail/:id',
  EDIT = 'edit',
  DELETE = 'delete'
}

export const exampleService = {
  list: async (): Promise<unknown> => {
    const res = await ApiService.get(EXAMPLE_ENDPOINT.LIST);
    return res.data;
  },

  detail: async (): Promise<unknown> => {
    const res = await ApiService.get(EXAMPLE_ENDPOINT.DETAIL);
    return res.data;
  },

  edit: async (): Promise<unknown> => {
    const res = await ApiService.get(EXAMPLE_ENDPOINT.EDIT);
    return res.data;
  },

  delete: async (): Promise<unknown> => {
    const res = await ApiService.get(EXAMPLE_ENDPOINT.DELETE);
    return res.data;
  }
};
