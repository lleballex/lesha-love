import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UsersModule } from '@/users/users.module'
import { AuthModule } from '@/auth/auth.module'
import { AuthMiddleware } from '@/auth/auth.middleware'
import { User } from '@/users/entities/user.entity'
import { Vacancy } from '@/vacancies/entities/vacancy.entity'
import { Response } from '@/responses/entities/response.entity'
import { SeederModule } from '@/seeder/seeder.module'
import { VacanciesModule } from '@/vacancies/vacancies.module'
import { Scope } from '@/scopes/entities/scope.entity'
import { Recruiter } from '@/users/entities/recruiter.entity'
import { Candidate } from '@/users/entities/candidate.entity'
import { ScopesModule } from '@/scopes/scopes.module'
import { ResponsesModule } from '@/responses/responses.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Recruiter, Candidate, Scope, Vacancy, Response], // TODO: extract somewhere
      synchronize: true, // TODO: use migrations
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '2d',
        },
      }),
    }),

    UsersModule,
    AuthModule,
    VacanciesModule,
    ResponsesModule,
    ScopesModule,
    SeederModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
