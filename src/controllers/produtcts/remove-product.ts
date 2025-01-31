import { Request, Response } from "express";

import { IRemoveProductService } from "@services/Product";

import { RequestTypeEnum } from "@helpers/RequestTypeEnum";
import { ResponseHandler, ResponseMessageReturn } from "@helpers/ResponseHandler";
import { ResponseErrorHandler, ResponseErrorReturn } from "@helpers/ResponseErrorHandler";

type RemoveProductResponse = ResponseMessageReturn<boolean> | ResponseErrorReturn

export class RemoveProductController {
  constructor(private readonly removeProductService: IRemoveProductService) {}

  async handle(
    req: Request<{ id: string }>, 
    res: Response<RemoveProductResponse>
  ) {
    try {
      const { id } = req.params;
      const product = await this.removeProductService.execute(id);

      if (!product) {
        return res.status(404).send(ResponseErrorHandler.responseMessage({
          error: product,
          message: "Fail to delete a product",
          url: `/product/${id}`,
        }));
      }

      const response = ResponseHandler.responseMessage({
        data: product,
        requestType: RequestTypeEnum.DELETE,
        message: "Product removed successfully",
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