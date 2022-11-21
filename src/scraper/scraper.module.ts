import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, PrismaService]
})
export class ScraperModule {}
