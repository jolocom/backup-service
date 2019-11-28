import { createConnection, getMongoManager } from "typeorm";
import express from "express"
import { Backup } from "./entities/backup";
import bodyParser from "body-parser";
import getRouter from "./router";
import { handleAuthentication } from "./authentication";
import morgan from "morgan";

export async function getApp(isTest = false) {

  await createConnection({
    type: "mongodb",
    host: isTest ? "localhost" : "mongo",
    port: 27017,
    database: isTest ? "testDB" : "backup",
    entities: [Backup]
  });

  const app = express();
  app.use(morgan('common'));
  app.use(bodyParser.json({ limit: '1kb' }));

  app.use(handleAuthentication);
  app.use('/', getRouter(getMongoManager()));

  return app
}

