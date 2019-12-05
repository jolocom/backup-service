import express from 'express';
import { MongoEntityManager } from "typeorm";
import { Backup } from "./entities/backup";

export default function getRouter(manager: MongoEntityManager) {
  const router = express.Router();

  router.post("/get-backup", async (req, res) => {
    const publicKey = req.body["auth"]["pubKey"];
    const backup = await manager.findOne(Backup, { publicKey: publicKey });
    if (backup)
      res.send(backup.data);
    else
      res.status(404).send('Not found')
  });

  router.post("/store-backup", (async (req, res) => {
    try {
      const backup = Backup.fromData(req.body['data']);
      if (await manager.findOne(Backup, { publicKey: backup.publicKey }))
        await manager.findOneAndReplace(Backup, { publicKey: backup.publicKey }, backup);
      else
        await manager.save(backup);
      res.send("Saved!")
    } catch (e) {
      console.log(e);
      res.status(400);
      res.send(e.message)
    }
  }));

  router.post("/delete-backup", (async (req, res) => {
    const publicKey = req.body['auth']['pubKey'];
    await manager.delete(Backup, { publicKey: publicKey });
    res.status(200);
    res.send()
  }));

  return router;
}
