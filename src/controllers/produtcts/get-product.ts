import { Request, Response } from "express";

import { ProductDTO } from "@models/dto";

import { IGetProductService } from "@services/Product";

import { RequestTypeEnum } from "@helpers/RequestTypeEnum";
import { ResponseHandler, ResponseMessageReturn } from "@helpers/ResponseHandler";
import { ResponseErrorHandler, ResponseErrorReturn } from "@helpers/ResponseErrorHandler";

type GetProductResponse = ResponseMessageReturn<ProductDTO> | ResponseErrorReturn

export class GetProductController {
  constructor(private readonly getProductService: IGetProductService) {}

  async handle(
    req: Request<{ id: string }>, 
    res: Response<GetProductResponse>
  ) {
    try {
      const { id } = req.params;
      const product = await this.getProductService.execute(id);

      if (!product) {
        return res.status(404).send(ResponseErrorHandler.responseMessage({
          error: "Product not found",
          message: "Product not found",
          url: `/product/${id}`,
        }));
      }

      const response = ResponseHandler.responseMessage({
        data: product,
        requestType: RequestTypeEnum.GET,
        message: "Get Product successfully",
        url: `/product/${id}`,
      })
      
      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(ResponseErrorHandler.responseMessage({
        error: error,
        message: "Internal server error",
        url: `/product/${req.params.id}`,
      }));
    }
  }
}