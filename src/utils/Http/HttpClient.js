const BASE_URL = 'http://demo.airsial.com.pk:8191/crc-demo/api';

class HttpClient {
  constructor(baseURL, headers = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  async request(method, endpoint, data = null, authToken = null) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method,
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming the response is JSON
      return await response.json();
    } catch (error) {
      throw new Error(`HTTP error! status: ${error.message}`);
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
