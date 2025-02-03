import { Request, Response } from "express";

import { ProductDTO } from "@models/dto";

import { IGetAllProductService } from "@services/Product";

import { RequestTypeEnum } from "@helpers/RequestTypeEnum";
import {
  ResponseHandler,
  ResponseMessageReturn,
} from "@helpers/ResponseHandler";
import {
  ResponseErrorHandler,
  ResponseErrorReturn,
} from "@helpers/ResponseErrorHandler";

type GetAllProductResponse =
  | ResponseMessageReturn<ProductDTO[]>
  | ResponseErrorReturn;

export class GetAllProductController {
  constructor(private readonly getAllProductService: IGetAllProductService) {}

  private getRouter = "/products";

  async handle(req: Request, res: Response<GetAllProductResponse>) {
    try {
      const productList = await this.getAllProductService.execute();

      if (productList.length === 0) {
        return res.status(404).send(
          ResponseErrorHandler.responseMessage({
            error: "No one product found",
            message: "No one product found",
            url: this.getRouter,
          })
        );
      }

      const response = ResponseHandler.responseMessage({
        data: productList,
        requestType: RequestTypeEnum.GET,
        message: "Get Product list successfully",
        url: this.getRouter,
      });

      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(
        ResponseErrorHandler.responseMessage({
          error: error,
          message: "Internal server error",
          url: this.getRouter,
        })
      );
    }
  }
}
