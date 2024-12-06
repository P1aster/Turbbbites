import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { TypeOrmExceptionFilter } from '@/filters/typeORM-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(), new TypeOrmExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
