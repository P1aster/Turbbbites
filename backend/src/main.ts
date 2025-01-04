import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { TypeOrmExceptionFilter } from '@/filters/typeORM-exception.filter';
import { ValidationExceptionFilter } from '@/filters/bad-request-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // Global filters
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
    new TypeOrmExceptionFilter(),
  );

  // Enable CORS only in development
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: '*',
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
