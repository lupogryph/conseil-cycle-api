import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MeetingModule } from './meeting/meeting.module';
import { Meeting } from './meeting/entities/meeting.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Meeting],
      synchronize: Boolean(process.env.DATABASE_SYNC) || false,
    }),
    AuthModule,
    UserModule,
    MeetingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
