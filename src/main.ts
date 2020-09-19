import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const cors = {
        origin: [
            '*',
        ],
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: [
            'Accept',
            'Content-Type',
            'Authorization',
            'token',
        ],
    };
    app.enableCors(cors);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.listen(3000);
}
bootstrap();