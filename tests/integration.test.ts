import request from 'supertest'
import { getApp } from "../app";
import { Express } from "express";
import { encryptedData } from "./test.data";


describe('Integration Tests', () => {
  let app: Express
  beforeAll(async () => {
    app = await getApp()
  });
  it('should return "not found" if data does not exist', async () => {
    const result = await request(app).get('/test')
    expect(result.status).toBe(404)
  });

  it('should store data to the database', async () => {
    const result = await request(app).post('/')
      .send(encryptedData)
      .set('Accept', 'application/json')
    expect(result.status).toBe(200)

  });
  it('should fail if data is wrong', async () => {
    const result = await request(app).post('/')
      .send({ data: 'Not backup data' })
      .set('Accept', 'application/json');
    expect(result.status).toBe(400)
  });
});