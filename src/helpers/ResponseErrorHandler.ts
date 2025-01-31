import { RequestTypeEnum } from "./RequestTypeEnum";

interface ResponseError {
  error: any;
  message: string;
  url: string;
}

export interface ResponseErrorReturn {
  error: any;
  request: {
    description: string;
    url: string;
  };
}

export class ResponseErrorHandler {
  static responseMessage(response: ResponseError): ResponseErrorReturn {
    return {
      error: response.error,
      request: {
        description: response.message,
        url: response.url,
      }
    };
  }
}