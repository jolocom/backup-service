import { Response, Request, NextFunction } from "express";
import { verify } from 'tiny-secp256k1'
import * as crypto from "crypto";

export async function handleAuthentication(req: Request, res: Response, next: NextFunction) {
  let errorMsg;
  if (req.body['auth'] && req.body['auth']["pubKey"] && req.body['auth']["date"] && req.body['auth']["sig"]) {
    const publicKey = req.body['auth']['pubKey'];
    const date = req.body['auth']["date"];
    const signature = req.body['auth']["sig"];

    try {
      // validate if public keys are identical
      if (req.body['data'] && (publicKey !== req.body["data"]['keys'][0]['pubKey']))
        throw new Error('Public Keys are not identical');

      // validate date
      const timespan = new Date().getTime() - new Date(date).getTime();
      if (timespan > 60000) // 1 min
        throw new Error('Request expired');
      const dateHash = crypto
        .createHash('sha256')
        .update(date)
        .digest();
      // validate signature
      await verify(Buffer.from(dateHash), Buffer.from(publicKey, 'hex'), Buffer.from(signature, 'hex'));
      next();
      return
    } catch (e) {
      errorMsg = e.message;
      console.log('Invalid auth data', e);
    }
  } else {
    errorMsg = 'Authentication missing'
  }
  res.status(400);
  res.send('Authentication failed: ' + errorMsg)

}