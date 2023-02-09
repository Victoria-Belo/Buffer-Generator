import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true  });
  app.enableCors({
    origin: ['*', 'https://victoria-belo.github.io/file', 'https://victoria-belo.github.io/Buffer-Generator/#/upload/AppController_Hi','https://victoria-belo.github.io/Buffer-Generator/#/file/AppController_Hi' ],      
    methods: ["GET", "POST"],
  });
  const config = new DocumentBuilder()
    .setTitle('GeneratorCSV Buffer')
    .setDescription('A simple file uploading. CSV only.')
    .setVersion('1.0')    
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,
  {swaggerOptions: {defaultModelsExpandDepth:-1}});
  await app.listen(3000);
}
bootstrap();
