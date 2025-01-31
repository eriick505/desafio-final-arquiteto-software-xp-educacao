import { RequestTypeEnum } from "@helpers/RequestTypeEnum";
import { ResponseErrorHandler, ResponseErrorReturn } from "@helpers/ResponseErrorHandler";
import { ResponseHandler, ResponseMessageReturn } from "@helpers/ResponseHandler";
import { ProductDTO } from "@models/dto";
import { ICreateProductService } from "@services/Product";
import { Request, Response } from "express";

type CreateProductResponse = ResponseMessageReturn<boolean> | ResponseErrorReturn

export class CreateProductController {
  constructor(private readonly createProductService: ICreateProductService) {}

  async handle(
    req: Request<{}, {}, ProductDTO>, 
    res: Response<CreateProductResponse>
  ) {
    try {
      const { name, price, category_id, rating } = req.body;

      const product = await this.createProductService.execute({ 
        name, 
        price, 
        category_id, 
        rating
      });

      if (!product) {
        return res.status(400).send(ResponseErrorHandler.responseMessage({
          error: "Product not created",
          message: "Product not created",
          url: '/product',
        }));
      }

      const response = ResponseHandler.responseMessage({
        data: product,
        requestType: RequestTypeEnum.POST,
        message: "Product created successfully",
        url: '/product',
      })

      return res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send(ResponseErrorHandler.responseMessage({
        error: error,
        message: "Internal server error",
        url: '/product',
      }));
    }
  }
}