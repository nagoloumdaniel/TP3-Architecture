export class SmtpMailer {
  constructor(config = {}) {
    this.config = { host: config.host ?? process.env.SMTP_HOST ?? 'smtp.shoplite.fr', port: config.port ?? Number(process.env.SMTP_PORT ?? 587) };
    this.outbox = [];
  }
  send({ to, subject, body }) { this.outbox.push({ via: `${this.config.host}:${this.config.port}`, to, subject, body }); }
}
