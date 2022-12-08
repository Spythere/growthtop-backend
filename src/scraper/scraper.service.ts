import { Injectable } from '@nestjs/common';
import { ScraperManager } from './ScraperManager';

@Injectable()
export class ScraperService extends ScraperManager {}
