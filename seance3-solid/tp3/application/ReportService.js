import { computeStats } from '../domain/salesStats.js';
import { validateEmailAddress } from '../domain/EmailAddress.js';

export class ReportService {
  constructor({ orders, registry, mailer, logger, policy }) {
    this.orders = orders;
    this.registry = registry;
    this.mailer = mailer;
    this.logger = logger;
    this.policy = policy;
  }
  generate(month, format, recipient) {
    this.policy.validate({ format, recipient });
    const stats = computeStats(this.orders.all(), month);
    const output = this.registry.get(format).format(stats);
    this.logger.info(`rapport ${month} (${format}) : ${stats.count} commande(s)`);
    if (recipient) {
      validateEmailAddress(recipient);
      this.mailer.send({ to: recipient, subject: `Rapport des ventes ${month}`, body: output });
    }
    return output;
  }
}
