import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: process.env.JWT_SECRET || 'sipajak',
    signOptions: { expiresIn: process.env.JWT_EXPIRES || '2d' },
  })],
  controllers: [UsersController],
  providers: [UsersService],
})

export class UsersModule {}