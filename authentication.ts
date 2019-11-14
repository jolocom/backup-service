import { Response, Request, NextFunction } from "express";
// @ts-ignore
import eccrypto from "eccrypto";

export async function handleAuthentication(req: Request, res: Response, next: NextFunction) {
  if (req.body['auth'] && req.body['auth']["pubKey"] && req.body['auth']["date"] && req.body['auth']["sig"]) {
    const publicKey = req.body['auth']['pubKey'];
    const date = req.body['auth']["date"];
    const signature = req.body['auth']["sig"];

    try {
      // validate date
      const timespan = new Date().getTime() - new Date(date).getTime();
      if (timespan > 60000) // 1 min
        throw new Error('Request expired');

      // validate signature
      await eccrypto.verify(Buffer.from(publicKey, 'hex'), Buffer.from(date), Buffer.from(signature, 'hex'));
      next();

    } catch (e) {
      console.log('Invalid auth data', e);
      res.status(400);
      res.send('Authentication data invalid')
    }

  } else {
    res.status(400);
    res.send('Authentication missing')
  }

}