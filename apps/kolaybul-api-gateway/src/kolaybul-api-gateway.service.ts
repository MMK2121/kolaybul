import { Injectable } from '@nestjs/common';

@Injectable()
export class KolaybulApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
