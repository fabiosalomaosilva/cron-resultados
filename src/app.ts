import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import buscaResultado from "./job/buscaResultado";

class App {
  public express: express.Application;

  public constructor() {
    dotenv.config();
    this.express = express();

    this.middlewares();
    this.database();
    this.getResults();
  }

  private middlewares(): void {
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect(process.env.MONGO_DB as string);
    console.log('MongoDB connected!!')
  }

  private getResults() {
    buscaResultado.buscaTodaNoite();
    this.express.get('/', (req, res) => {
      return res.send('Serviço CRON JOB running 🔥🔥');
    });
  }
}

export default new App().express;
