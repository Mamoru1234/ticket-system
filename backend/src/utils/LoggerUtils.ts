import { configure, getLogger, Logger } from 'log4js';
import { join, relative } from 'path';

export class LoggerUtils {
  static configure(): void {
    configure({
      appenders: { 'out': { type: 'stdout', layout: { type: 'basic' } } },
      categories: { 'default': { appenders: ['out'], level: 'debug' } }
    });
  }
  static getLogger(fileName: string): Logger {
    return getLogger(relative(join(__dirname, '..'), fileName));
  }
}
