import { RequestTypeEnum } from "./RequestTypeEnum";

interface ResponseMessage<T> {
  data: T;
  requestType: RequestTypeEnum;
  message: string;
  url: string;
}

export interface ResponseMessageReturn<T> {
  data: T;
  request: {
    type: RequestTypeEnum;
    description: string;
    url: string;
  };
}

export class ResponseHandler {
  static responseMessage<T>(response: ResponseMessage<T>): ResponseMessageReturn<T> {
    return {
      data: response.data,
      request: {
        type: response.requestType,
        description: response.message,
        url: response.url,
      },
    };
  }
}