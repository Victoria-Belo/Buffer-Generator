import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AppService } from '../service/app.service';
import { FileUploadDto } from '../dto/FileUploadDto';
@ApiTags('file')
@Controller('file')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '',
    type: FileUploadDto,
  })
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .addMaxSizeValidator({
          maxSize: 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {   
    return this.service.creatingBuffer(file);
  }
  
  @Get()
  async Hi(){
    return this.service.hello();
  }
}
