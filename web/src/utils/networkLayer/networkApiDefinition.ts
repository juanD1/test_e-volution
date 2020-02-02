import { Method } from "axios";

export interface ApiDefinition {
  method: Method;
  headers: Object;
  url: string;
  baseURL: string;
  data?: Object;
}