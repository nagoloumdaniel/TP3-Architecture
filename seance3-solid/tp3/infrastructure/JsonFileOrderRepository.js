import fs from 'node:fs';

export class JsonFileOrderRepository {
  constructor(file = new URL('../orders.json', import.meta.url)) { this.file = file; }
  all() { return JSON.parse(fs.readFileSync(this.file, 'utf8')); }
}
