import { Request, Response } from "express";

import { ICountProductsService } from "@services/Product";

import { RequestTypeEnum } from "@helpers/RequestTypeEnum";

import {
  ResponseHandler,
  ResponseMessageReturn,
} from "@helpers/ResponseHandler";

import {
  ResponseErrorHandler,
  ResponseErrorReturn,
} from "@helpers/ResponseErrorHandler";

type CountProductsResponse =
  | ResponseMessageReturn<{ count: number }>
  | ResponseErrorReturn;

export class CountProductsController {
  constructor(private readonly countProductsService: ICountProductsService) {}

  async handle(req: Request, res: Response<CountProductsResponse>) {
    try {
      console.log(
        "CountProductsController -> handle -> countProductsService",
        this.countProductsService
      );
      const count = await this.countProductsService.execute();

      const response = ResponseHandler.responseMessage({
        data: {
          count,
        },
        requestType: RequestTypeEnum.GET,
        message: "Get count of products successfully",
        url: `/products/count`,
      });

      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(
        ResponseErrorHandler.responseMessage({
          error: error,
          message: "Internal server error",
          url: `/products/count`,
        })
      );
    }
  }
}
