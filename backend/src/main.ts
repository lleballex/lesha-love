import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '@/app.module'
import { EntityNotFoundFilter } from '@/core/filters/entity-not-found.filter'
import { SeederService } from '@/seeder/seeder.service'
import { LoggingInterceptor } from '@/core/interceptors/logging.interceptor'
import { AllExceptionsFilter } from '@/core/filters/all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new AllExceptionsFilter(), new EntityNotFoundFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('LeshaLove')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  SwaggerModule.setup(
    'api',
    app,
    () => SwaggerModule.createDocument(app, swaggerConfig),
    {
      customSiteTitle: 'LeshaLove API',
    },
  )

  const seederService = app.get(SeederService)
  await seederService.seed()

  await app.listen(process.env.PORT)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
