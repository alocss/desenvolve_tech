import { Test, type TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';

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
});
