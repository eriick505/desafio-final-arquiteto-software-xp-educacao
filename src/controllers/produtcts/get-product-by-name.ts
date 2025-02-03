import { Request, Response } from "express";

import { ProductDTO } from "@models/dto";

import { IGetProductByNameService } from "@services/Product";

import { RequestTypeEnum } from "@helpers/RequestTypeEnum";
import {
  ResponseHandler,
  ResponseMessageReturn,
} from "@helpers/ResponseHandler";
import {
  ResponseErrorHandler,
  ResponseErrorReturn,
} from "@helpers/ResponseErrorHandler";

type GetProductByNameResponse =
  | ResponseMessageReturn<ProductDTO>
  | ResponseErrorReturn;

export class GetProductByNameController {
  constructor(
    private readonly getProductByNameService: IGetProductByNameService
  ) {}

  async handle(
    req: Request<{ name: string }>,
    res: Response<GetProductByNameResponse>
  ) {
    try {
      const { name } = req.params;
      const product = await this.getProductByNameService.execute(name);

      if (!product) {
        return res.status(404).send(
          ResponseErrorHandler.responseMessage({
            error: "Product not found",
            message: "Product not found",
            url: `/product/name/${name}`,
          })
        );
      }

      const response = ResponseHandler.responseMessage({
        data: product,
        requestType: RequestTypeEnum.GET,
        message: "Get Product successfully",
        url: `/product/name/${name}`,
      });

      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(
        ResponseErrorHandler.responseMessage({
          error: error,
          message: "Internal server error",
          url: `/product/name/${req.params.name}`,
        })
      );
    }
  }
}
