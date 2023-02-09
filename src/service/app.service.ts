import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class AppService {
  async creatingBuffer(file: Express.Multer.File) {
    return { file: file.buffer };
  }
  
  hello(){
    return 'Hi everyone! :D';
  }
}
