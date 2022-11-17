import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [ApiModule, HttpModule],
})
export class AppModule {}
