import type { Server } from 'node:http';
import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ContactController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  it('aceita um envio válido', () => {
    return request(app.getHttpServer() as Server)
      .post('/contact')
      .send({
        name: 'Maria Silva',
        email: 'maria@example.com',
        message: 'Gostaria de um orçamento para um site institucional.',
      })
      .expect(200)
      .expect({ received: true });
  });

  it('rejeita quando falta um campo obrigatório', () => {
    return request(app.getHttpServer() as Server)
      .post('/contact')
      .send({ name: 'Maria Silva', message: 'Sem e-mail.' })
      .expect(400);
  });

  it('rejeita e-mail com formato inválido', () => {
    return request(app.getHttpServer() as Server)
      .post('/contact')
      .send({ name: 'Maria Silva', email: 'não-é-um-email', message: 'Teste.' })
      .expect(400);
  });

  it('rejeita campos não esperados no payload', () => {
    return request(app.getHttpServer() as Server)
      .post('/contact')
      .send({
        name: 'Maria Silva',
        email: 'maria@example.com',
        message: 'Teste.',
        admin: true,
      })
      .expect(400);
  });

  it('aceita silenciosamente quando o honeypot está preenchido (spam)', () => {
    return request(app.getHttpServer() as Server)
      .post('/contact')
      .send({
        name: 'Bot',
        email: 'bot@example.com',
        message: 'Spam automatizado.',
        website: 'http://spam.example.com',
      })
      .expect(200)
      .expect({ received: true });
  });

  afterEach(async () => {
    await app.close();
  });
});
