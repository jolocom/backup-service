import express from "express"
import bodyParser from "body-parser";

export async function getApp() {

  const app = express();

  app.use(bodyParser.json());

  return app
}

