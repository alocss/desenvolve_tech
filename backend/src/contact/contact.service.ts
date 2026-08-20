import * as dns from 'node:dns';
import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { CreateContactDto } from './dto/create-contact.dto';

const SMTP_TIMEOUT_MS = 10_000;

@Injectable()
export class ContactService implements OnModuleInit {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter | null = null;

  async onModuleInit() {
    this.transporter = await this.buildTransporter();
  }

  async submit(dto: CreateContactDto): Promise<{ received: boolean }> {
    if (dto.website) {
      this.logger.warn(`Honeypot acionado por ${dto.email} — lead descartado.`);
      return { received: true };
    }

    this.logger.log(`Novo lead: ${dto.name} <${dto.email}>`);

    if (!this.transporter) {
      this.logger.warn('SMTP não configurado — notificação por e-mail não enviada.');
      return { received: true };
    }

    try {
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
    } catch (error) {
      // O lead já está registrado no log acima — uma falha de e-mail (SMTP
      // fora do ar, timeout, credencial inválida) não pode derrubar a
      // resposta para quem preencheu o formulário.
      this.logger.error('Falha ao enviar notificação por e-mail do lead.', error);
    }

    return { received: true };
  }

  private async buildTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
      return null;
    }

    // O nodemailer decide se tenta resolver o host em IPv4 checando as
    // interfaces de rede locais (os.networkInterfaces()) — em ambientes
    // containerizados (ex.: Railway) essa checagem erra e ele pula direto
    // para IPv6, que costuma ser inalcançável nesses ambientes. Resolvemos
    // o IPv4 nós mesmos para não depender dessa heurística.
    let host = SMTP_HOST;
    try {
      const [address] = await dns.promises.resolve4(SMTP_HOST);
      if (address) host = address;
    } catch (error) {
      this.logger.warn(
        `Não foi possível resolver IPv4 de ${SMTP_HOST} — usando hostname direto.`,
        error,
      );
    }

    return nodemailer.createTransport({
      host,
      // servername garante que o TLS valide o certificado contra o
      // hostname real, mesmo conectando por IP.
      tls: { servername: SMTP_HOST },
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
      connectionTimeout: SMTP_TIMEOUT_MS,
      greetingTimeout: SMTP_TIMEOUT_MS,
      socketTimeout: SMTP_TIMEOUT_MS,
    });
  }
}
