import express from 'express'
import cors from "cors";

import { productRouter } from '@routes/ProductRouter';

class App {
  static init() {
    const app = express();
    const port = 3000;

    const corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    };

    app.use(cors(corsOptions))
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use("/products", productRouter);

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  }
}

App.init();