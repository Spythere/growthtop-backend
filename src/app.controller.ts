import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {
  }
}
