import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScraperService {
  constructor(private readonly httpService: HttpService) {}

  async fetchData() {
    return this.httpService.get('https://www.amazon.com/');
  }
}
