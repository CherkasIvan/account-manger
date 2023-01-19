import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { configService } from './config/config.service';

import { AppModule } from './app.module';

/**
 * Head of app function
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const config = new DocumentBuilder()
        .setTitle('Bank accounts api. Test task')
        .setDescription('The bank accounts API description')
        .setVersion('1.0')
        .addTag('Bank accounts')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const whiteList = [];
    app.enableCors({
        origin: whiteList,
    });

    await app.listen(configService.getPort());
}
bootstrap();
