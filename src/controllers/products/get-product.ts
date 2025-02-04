import { Request, Response } from "express";

import { ProductDTO } from "@models/dto";

import { IGetProductService } from "@services/Product";

import { RequestTypeEnum } from "@helpers/RequestTypeEnum";
import {
  ResponseHandler,
  ResponseMessageReturn,
} from "@helpers/ResponseHandler";
import {
  ResponseErrorHandler,
  ResponseErrorReturn,
} from "@helpers/ResponseErrorHandler";

type GetProductResponse =
  | ResponseMessageReturn<ProductDTO>
  | ResponseErrorReturn;

export class GetProductController {
  constructor(private readonly getProductService: IGetProductService) {}

  private getRouter(id: string) {
    return `/products/${id}`;
  }

  async handle(
    req: Request<{ id: string }>,
    res: Response<GetProductResponse>
  ) {
    try {
      const { id } = req.params;
      const product = await this.getProductService.execute(id);

      if (!product) {
        return res.status(404).send(
          ResponseErrorHandler.responseMessage({
            error: "Product not found",
            message: "Product not found",
            url: this.getRouter(id),
          })
        );
      }

      const response = ResponseHandler.responseMessage({
        data: product,
        requestType: RequestTypeEnum.GET,
        message: "Get Product successfully",
        url: this.getRouter(id),
      });

      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(
        ResponseErrorHandler.responseMessage({
          error: error,
          message: "Internal server error",
          url: this.getRouter(req.params.id),
        })
      );
    }
  }
}
