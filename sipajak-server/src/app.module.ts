import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Event } from './event/entities/event.entity';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'asdasd',
      username: 'postgres',
      entities: [User,Event],
      database: 'postgres',
      synchronize: false, // true from start
      logging: true,
    }),
    UsersModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}