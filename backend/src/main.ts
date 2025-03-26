import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '@/app.module'
import { EntityNotFoundFilter } from '@/core/filters/entity-not-found.filter'
import { SeederService } from '@/seeder/seeder.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new EntityNotFoundFilter())
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
