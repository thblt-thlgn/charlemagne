import { RequestData } from './request-data';

export interface Context {
  requestData: RequestData;
  setCookies: (key: string, value: string | null) => void;
}
