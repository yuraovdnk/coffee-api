import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Coffee API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /coffees returns 200 and the menu', async () => {
    const res = await request(app.getHttpServer()).get('/coffees').expect(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toMatchObject({ name: 'Espresso1' });
  });

  it('GET /coffees responds with JSON', async () => {
    await request(app.getHttpServer())
      .get('/coffees')
      .expect('Content-Type', /json/);
  });

  it('every item has the expected shape', async () => {
    const res = await request(app.getHttpServer()).get('/coffees');
    for (const item of res.body) {
      expect(item).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        priceUsd: expect.any(Number),
      });
    }
  });

  it('unknown route returns 404', async () => {
    await request(app.getHttpServer()).get('/tea').expect(404);
  });

  it('POST /coffees is not allowed (404)', async () => {
    await request(app.getHttpServer()).post('/coffees').expect(404);
  });
});
