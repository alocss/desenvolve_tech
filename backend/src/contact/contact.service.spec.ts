import { Test, type TestingModule } from '@nestjs/testing';
import * as nodemailer from 'nodemailer';
import { ContactService } from './contact.service';

jest.mock('nodemailer');

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = module.get(ContactService);
  });

  it('descarta silenciosamente quando o honeypot está preenchido', async () => {
    const result = await service.submit({
      name: 'Bot',
      email: 'bot@example.com',
      message: 'spam',
      website: 'http://spam.example.com',
    });

    expect(result).toEqual({ received: true });
  });

  it('confirma o recebimento mesmo sem SMTP configurado (log local)', async () => {
    const result = await service.submit({
      name: 'Maria Silva',
      email: 'maria@example.com',
      message: 'Preciso de um orçamento.',
    });

    expect(result).toEqual({ received: true });
  });

  describe('com SMTP configurado', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = {
        ...originalEnv,
        SMTP_HOST: 'smtp.example.com',
        SMTP_PORT: '587',
        SMTP_USER: 'user@example.com',
        SMTP_PASSWORD: 'secret',
      };
    });

    afterEach(() => {
      process.env = originalEnv;
      jest.restoreAllMocks();
    });

    it('não derruba a resposta quando o envio de e-mail falha (timeout, credencial etc.)', async () => {
      const sendMail = jest.fn().mockRejectedValue(new Error('connection timeout'));
      (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail });

      const module: TestingModule = await Test.createTestingModule({
        providers: [ContactService],
      }).compile();
      const smtpService = module.get(ContactService);

      const result = await smtpService.submit({
        name: 'Maria Silva',
        email: 'maria@example.com',
        message: 'Preciso de um orçamento.',
      });

      expect(result).toEqual({ received: true });
      expect(sendMail).toHaveBeenCalledTimes(1);
    });

    it('configura timeouts no transporter para não travar em conexões lentas', async () => {
      (nodemailer.createTransport as jest.Mock).mockReturnValue({
        sendMail: jest.fn().mockResolvedValue(undefined),
      });

      const module: TestingModule = await Test.createTestingModule({
        providers: [ContactService],
      }).compile();
      module.get(ContactService);

      const createTransportMock = nodemailer.createTransport as jest.Mock;
      const [options] = createTransportMock.mock.calls[0] as [Record<string, unknown>];
      expect(typeof options.connectionTimeout).toBe('number');
      expect(typeof options.greetingTimeout).toBe('number');
      expect(typeof options.socketTimeout).toBe('number');
    });
  });
});
