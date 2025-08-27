import axios from 'axios';

const BASE_URL = 'http://demo.airsial.com.pk:8191/crc-demo/api';

class HttpClient {
  constructor(baseURL, headers = {}) {
    this.client = axios.create({
      baseURL,
      headers,
    });
  }

  async request(method, endpoint, data = null, authToken = null) {
    try {
      const config = {
        method,
        url: endpoint,
        data,
      };

      if (authToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${authToken}`,
        };
      }

      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
  }

  get(endpoint, authToken = null) {
    return this.request('GET', endpoint, null, authToken);
  }

  post(endpoint, body, authToken = null) {
    return this.request('POST', endpoint, body, authToken);
  }

  put(endpoint, body, authToken = null) {
    return this.request('PUT', endpoint, body, authToken);
  }

  delete(endpoint, authToken = null) {
    return this.request('DELETE', endpoint, null, authToken);
  }
}

const httpClient = new HttpClient(BASE_URL);

export default httpClient;
