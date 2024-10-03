import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlAuthGuard } from './modules/auth/jwt/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new GqlAuthGuard(new Reflector()));
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.API_PORT);
}
bootstrap();
