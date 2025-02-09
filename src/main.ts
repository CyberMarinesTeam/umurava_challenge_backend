import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the config service
  const configService = app.get(ConfigService);

  // Set up CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  // Configure Swagger
  const options = new DocumentBuilder()
    .setTitle('Umurava Skills Challenge API Documentation')
    .setDescription('Made by CyberMarineTeam')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.PORT}/`, 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Get the port from environment variables
  const port = process.env.PORT || 4000;

  console.log(`🚀 Server running on http://localhost:${port}/api`);

  // Start the server
  await app.listen(port);
}

bootstrap();
