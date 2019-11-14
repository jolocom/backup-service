import { createConnection, getMongoManager } from "typeorm";
import express from "express"
import { Backup } from "./entities/backup";
import bodyParser from "body-parser";
import getRouter from "./router";
import { handleAuthentication } from "./authentication";

export async function getApp(isTest=false) {

  await createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: isTest ? "backup" : "testDB",
    entities: [Backup]
  });

  const app = express();

  // todo set post data limit
  app.use(bodyParser.json());
  app.use(handleAuthentication);
  app.use('/', getRouter(getMongoManager()));

  return app
}

