import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly transporter = this.buildTransporter();

  async submit(dto: CreateContactDto): Promise<{ received: boolean }> {
    if (dto.website) {
      this.logger.warn(`Honeypot acionado por ${dto.email} — lead descartado.`);
      return { received: true };
    }

    if (!this.transporter) {
      this.logger.warn('SMTP não configurado — notificação por e-mail não enviada.');
      this.logger.log(`Novo lead: ${dto.name} <${dto.email}>`);
      return { received: true };
    }

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_NOTIFICATION_EMAIL,
      replyTo: dto.email,
      subject: `Novo contato pelo site — ${dto.name}`,
      text: [
        `Nome: ${dto.name}`,
        `E-mail: ${dto.email}`,
        dto.company ? `Empresa: ${dto.company}` : null,
        '',
        dto.message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return { received: true };
  }

  private buildTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
      return null;
    }
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
  }
}
