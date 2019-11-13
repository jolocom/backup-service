import express from 'express';
import { MongoEntityManager } from "typeorm";
import { Backup } from "./entities/backup";

export default function getRouter(manager: MongoEntityManager) {
  const router = express.Router();

  router.get("/:publicKey", async (req, res) => {
    // TODO add auth
    const publicKey = req.params["publicKey"];
    const backup = await manager.findOne(Backup, { publicKey: publicKey });
    if (backup)
      res.send(backup.data);
    else
      res.status(404).send('Not found')
  });

  router.post("/", (async (req, res) => {
    // TODO add auth
    try {
      const backup = Backup.fromData(req.body);
      if (await manager.findOne(Backup, { publicKey: backup.publicKey }))
        await manager.findOneAndReplace(Backup, { publicKey: backup.publicKey }, backup);
      else
        await manager.save(backup);
      res.send("Saved!")
    } catch (e) {
      res.status(400);
      res.send(e.message)
    }
  }));

  return router;
}
