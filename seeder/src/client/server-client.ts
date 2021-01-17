import axios, { AxiosInstance } from 'axios';

export class ServerClient {
  axiosInstance: AxiosInstance;
  constructor(private readonly url: string) {
    this.axiosInstance = axios.create({
      baseURL: this.url,
    });
  }
  async login(email: string, password: string): Promise<void> {
    const { data } = await this.axiosInstance.post('/auth/login', {
      email,
      password,
    });
    this.axiosInstance = axios.create({
      baseURL: this.url,
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
  }

  createUser(data: any): Promise<any> {
    return this.axiosInstance.post('/users/admin/create', data);
  }
}
