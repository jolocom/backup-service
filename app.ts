import { createConnection } from "typeorm";
import express from "express"
import { Backup } from "./entities/backup";
import bodyParser from "body-parser";

export async function getApp() {

  await createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "backup",
    entities: [Backup]
  });

  const app = express();

  // todo set post data limit
  app.use(bodyParser.json());

  return app
}

