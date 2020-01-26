import { ApiDefinition } from './networkApiDefinition';
import axios , { AxiosRequestConfig } from 'axios';

const generateConfig = (apiDefinition: ApiDefinition) => {
  const configObj: AxiosRequestConfig = {
    method: undefined,
    url: '',
    data: {},
    headers: {}
  };
  configObj.method = apiDefinition.method;
  configObj.url =  `${apiDefinition.baseURL}${encodeURI(apiDefinition.url)}`;
  if (apiDefinition.body) {
    configObj.data = apiDefinition.body;
  }
  configObj.headers = apiDefinition.headers;

  console.log('** network object: ', configObj);

  return configObj;
};

export default (apiDefinition: any) => {
  return axios(generateConfig(apiDefinition));
};