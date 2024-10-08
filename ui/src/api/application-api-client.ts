import axios from "axios";
import type { AxiosInstance } from "axios";
import qs from "qs";
import { SubscribersService } from "@/api/services/SubscribersService";
import { Environment } from "@/lib/environment";

export class ApplicationApiClient {
  public readonly subscribers: SubscribersService;
  public readonly axiosInstance: AxiosInstance;

  constructor() {
    const apiProtocol = Environment.apiProtocol ?? window.location.protocol;
    const apiHostName = Environment.apiHostName ?? window.location.hostname;
    const apiPort = Environment.apiPort ? `:${Environment.apiPort}` : "";
    const apiBaseUrl = `${apiProtocol}//${apiHostName}${apiPort}`;

    this.axiosInstance = axios.create({
      baseURL: apiBaseUrl,
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { indices: false }),
      },
    });

    this.subscribers = new SubscribersService(this.axiosInstance);
  }
}
