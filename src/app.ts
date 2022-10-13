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
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect(process.env.MONGO_DB as string);
    console.log('MongoDB connected!!')
  }

  private getResults() {
    buscaResultado.buscaTodaNoite();
  }
}

export default new App().express;
