import { Request, Response } from "express";

import { ProductDTO } from "@models/dto";
import { IUpdateProductService } from "@services/Product";

import { RequestTypeEnum } from "@helpers/RequestTypeEnum";
import {
  ResponseErrorHandler,
  ResponseErrorReturn,
} from "@helpers/ResponseErrorHandler";
import {
  ResponseHandler,
  ResponseMessageReturn,
} from "@helpers/ResponseHandler";

type UpdateProductResponse =
  | ResponseMessageReturn<boolean>
  | ResponseErrorReturn;

export class UpdateProductController {
  constructor(private readonly updateProductService: IUpdateProductService) {}

  private getRouter(id: string) {
    return `/products/${id}`;
  }

  async handle(
    req: Request<{}, {}, ProductDTO>,
    res: Response<UpdateProductResponse>
  ) {
    try {
      const { id, name, price, category_id, rating } = req.body;

      const product = await this.updateProductService.execute(id, {
        name,
        price,
        category_id,
        rating,
      });

      if (!product) {
        return res.status(400).send(
          ResponseErrorHandler.responseMessage({
            error: "Product not updated",
            message: "Product not updated",
            url: this.getRouter(id),
          })
        );
      }

      const response = ResponseHandler.responseMessage({
        data: product,
        requestType: RequestTypeEnum.PATCH,
        message: "Product updated successfully",
        url: this.getRouter(id),
      });

      return res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send(
        ResponseErrorHandler.responseMessage({
          error: error,
          message: "Internal server error",
          url: this.getRouter(req.body.id),
        })
      );
    }
  }
}
