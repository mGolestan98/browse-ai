import axios, { AxiosRequestConfig } from "axios";

type DataType = { [key: string]: any };

class RequestHandler {
  private apiBasePath = "https://api.browseai.com/v1";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = `Bearer ${apiKey}`;
  }

  private buildUrl = (path: string) => `${this.apiBasePath}${path}`;

  private buildConfig(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: this.apiKey
      }
    };
  }

  async get(url: string) {
    const res = await axios.get(this.buildUrl(url), this.buildConfig());
    return res.data;
  }

  async post(url: string, payload?: DataType) {
    return axios
      .post(this.buildUrl(url), payload, this.buildConfig())
      .then(({ data }: { data: any }) => data);
  }
}

export default RequestHandler;
