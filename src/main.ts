import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import { LoggerService } from './logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { RpcCustomExceptionFilter } from './shared/exceptions';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const logger = new Logger('Gateway');

	const app = await NestFactory.create(AppModule, { cors: true });
	app.setGlobalPrefix('api');

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));
	app.useGlobalFilters(new RpcCustomExceptionFilter());

	// Swagger setup
	const config = new DocumentBuilder().setTitle('Example API').setDescription('The API description').setVersion('1.0').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(envs.port);

	logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
