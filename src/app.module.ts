import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [ApiModule, HttpModule, ScraperModule],
})
export class AppModule {}
