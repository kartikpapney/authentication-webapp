import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { VerifyMiddleware } from './home/middleware/validate-user.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './orm/User';
import entities from './orm';
import { JwtService } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: entities,
      synchronize: true,
    }),

  ],
  controllers: [AuthController, HomeController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  }, {
    provide: 'HOME_SERVICE',
    useClass: HomeService
  },
    JwtService],

})

export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyMiddleware)
      .forRoutes(HomeController)

  }
}