import * as dns from 'node:dns';
import { Test, type TestingModule } from '@nestjs/testing';
import * as nodemailer from 'nodemailer';
import { ContactService } from './contact.service';

jest.mock('nodemailer');
jest.mock('node:dns', () => ({
  promises: {
    resolve4: jest.fn().mockRejectedValue(new Error('no dns in tests')),
  },
}));

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = module.get(ContactService);
    await service.onModuleInit();
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
      jest.clearAllMocks();
      process.env = {
        ...originalEnv,
        SMTP_HOST: 'smtp.example.com',
        SMTP_PORT: '587',
        SMTP_USER: 'user@example.com',
        SMTP_PASSWORD: 'secret',
      };
      (dns.promises.resolve4 as jest.Mock).mockResolvedValue(['203.0.113.10']);
    });

    afterEach(() => {
      process.env = originalEnv;
      jest.restoreAllMocks();
    });

    async function createSmtpService() {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ContactService],
      }).compile();
      const smtpService = module.get(ContactService);
      await smtpService.onModuleInit();
      return smtpService;
    }

    it('resolve o IPv4 do host e conecta por IP, mantendo o hostname original para o TLS', async () => {
      (nodemailer.createTransport as jest.Mock).mockReturnValue({
        sendMail: jest.fn().mockResolvedValue(undefined),
      });

      await createSmtpService();

      expect(dns.promises.resolve4).toHaveBeenCalledWith('smtp.example.com');
      const createTransportMock = nodemailer.createTransport as jest.Mock;
      const [options] = createTransportMock.mock.calls[0] as [Record<string, unknown>];
      expect(options.host).toBe('203.0.113.10');
      expect(options.tls).toEqual({ servername: 'smtp.example.com' });
    });

    it('usa o hostname original quando a resolução de IPv4 falha', async () => {
      (dns.promises.resolve4 as jest.Mock).mockRejectedValue(new Error('ENOTFOUND'));
      (nodemailer.createTransport as jest.Mock).mockReturnValue({
        sendMail: jest.fn().mockResolvedValue(undefined),
      });

      await createSmtpService();

      const createTransportMock = nodemailer.createTransport as jest.Mock;
      const [options] = createTransportMock.mock.calls[0] as [Record<string, unknown>];
      expect(options.host).toBe('smtp.example.com');
    });

    it('não derruba a resposta quando o envio de e-mail falha (timeout, credencial etc.)', async () => {
      const sendMail = jest.fn().mockRejectedValue(new Error('connection timeout'));
      (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail });

      const smtpService = await createSmtpService();
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

      await createSmtpService();

      const createTransportMock = nodemailer.createTransport as jest.Mock;
      const [options] = createTransportMock.mock.calls[0] as [Record<string, unknown>];
      expect(typeof options.connectionTimeout).toBe('number');
      expect(typeof options.greetingTimeout).toBe('number');
      expect(typeof options.socketTimeout).toBe('number');
    });
  });
});
