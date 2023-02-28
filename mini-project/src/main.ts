import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from './app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Minimal Releasable Code')
    .setDescription('The Mini Code API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const options: object = {
    url: 'http://localhost:4566/restapis/b67qjejhkc/local/_user_request_/',
  };

  SwaggerModule.setup('api', app, document, options);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
