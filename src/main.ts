import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import { LoggerService } from './logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { RpcCustomExceptionFilter } from './shared/exceptions';

async function bootstrap() {
	const logger = new Logger('Gateway');

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));
	app.useGlobalFilters(new RpcCustomExceptionFilter());

	await app.listen(envs.port);

	logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
