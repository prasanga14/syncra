import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(databaseConfig)],
})
export class DatabaseModule {}
