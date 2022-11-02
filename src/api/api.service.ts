import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getRandomNumber(): number {
    return ~~(Math.random() * 10);
  }
}
