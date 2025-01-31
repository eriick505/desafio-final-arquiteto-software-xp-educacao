import express from 'express'
import cors from "cors";

import { productRouter } from '@routes/ProductRouter';
import { sequelize } from '@config/sequelize';

class App {
  static initSequelize() {
    sequelize.sync()
      .then(() => console.log('Database & tables created!'))
      .catch(err => console.log('Error: ', err));

    return sequelize;
  }

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

    App.initSequelize();

    app.use("/products", productRouter);

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  }
}

App.init();