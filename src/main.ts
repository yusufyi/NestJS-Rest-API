import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Check if the type of the variable is correct
  //Check if the method is being called on the correct object
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
