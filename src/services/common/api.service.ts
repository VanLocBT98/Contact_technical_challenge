import axios, * as Axios from 'axios';

class ApiService {
  instance: Axios.AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}`
    });
  }
}

const instance = new ApiService().instance;

export { instance as ApiService };
