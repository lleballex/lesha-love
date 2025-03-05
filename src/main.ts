import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('LeshaLove')
    .setVersion('1.0')
    .build()

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, swaggerConfig),
  )

  await app.listen(process.env.PORT)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
