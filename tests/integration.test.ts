import request from 'supertest'
import { getApp } from "../app";
import { Express } from "express";
import { authData, encryptedData, testPublicKey } from "./test.data";
import { mockGlobalDate } from "./utils";
import { getMongoManager } from "typeorm";
import { Backup } from "../entities/backup";


describe('Integration Tests', () => {
  let app: Express;
  beforeAll(async () => {
    app = await getApp(true)
    mockGlobalDate()
    getMongoManager().clear(Backup)
  });
  it('should return "not found" if data does not exist', async () => {
    const result = await request(app).post('/get-backup')
      .send({
        auth: authData
      })
      .set('Accept', 'application/json')
    expect(result.status).toBe(404)
  });

  it('should store data to the database', async () => {
    const result = await request(app).post('/store-backup')
      .send({ auth: authData, data: encryptedData })
      .set('Accept', 'application/json')
    expect(result.status).toBe(200)
  });

  it('should store and return backup file if data exists', async () => {
    await request(app).post('/store-backup')
      .send({ auth: authData, data: encryptedData })
      .set('Accept', 'application/json')

    const result = await request(app).post('/get-backup')
      .send({
        auth: authData
      })
      .set('Accept', 'application/json')
    expect(result.status).toBe(200)
    expect(result.body).toEqual(encryptedData)
  });

  it('should fail if data is wrong', async () => {
    const result = await request(app).post('/store-backup')
      .send({ auth: authData, data: 'Not backup data' })
      .set('Accept', 'application/json');
    expect(result.status).toBe(400)
  });
});