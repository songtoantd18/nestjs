import { Injectable } from '@nestjs/common';


@Injectable()
export class TestServices {
  calc () {

    return 'hello word đây là service'
  }

}