import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { TypeOrmExceptionFilter } from '@/filters/typeORM-exception.filter';
import { ValidationExceptionFilter } from '@/filters/bad-request-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

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

  if (process.env.NODE_ENV !== 'production') {
    const server = app.getHttpServer();
    const address = server.address();
    const ip = address.address;
    const port = address.port;

    console.log(`Server is running on http://${ip}:${port}`);
  }
}

bootstrap();
