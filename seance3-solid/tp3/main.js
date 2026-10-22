import { ReportService } from './application/ReportService.js';
import { FreePolicy, ProPolicy } from './domain/policies.js';
import { CsvFormatter } from './formatters/CsvFormatter.js';
import { HtmlFormatter } from './formatters/HtmlFormatter.js';
import { JsonFormatter } from './formatters/JsonFormatter.js';
import { FormatterRegistry } from './formatters/FormatterRegistry.js';
import { ConsoleLogger } from './infrastructure/ConsoleLogger.js';
import { JsonFileOrderRepository } from './infrastructure/JsonFileOrderRepository.js';
import { SmtpMailer } from './infrastructure/SmtpMailer.js';

export function buildReportService({ policy = ProPolicy, logger, mailer, registry } = {}) {
  return new ReportService({
    orders: new JsonFileOrderRepository(),
    registry: registry ?? new FormatterRegistry().register('csv', new CsvFormatter()).register('html', new HtmlFormatter()).register('json', new JsonFormatter()),
    mailer: mailer ?? new SmtpMailer(),
    logger: logger ?? new ConsoleLogger(),
    policy,
  });
}

export function buildFreeReportService(options = {}) {
  return buildReportService({ ...options, policy: FreePolicy });
}

export function runDemo() {
  const mailer = new SmtpMailer();
  const service = buildReportService({ mailer });
  console.log(service.generate('2026-09', 'csv'));
  console.log(service.generate('2026-09', 'html', 'direction@shoplite.fr'));
  console.log('E-mails envoyés :', mailer.outbox.length);
}
