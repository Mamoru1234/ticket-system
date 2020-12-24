import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DAO_LIST } from './dao';
import { ENTITY_LIST } from './entity';
import { UserDao } from './dao/user.dao';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ENTITY_LIST,
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: DAO_LIST,
  exports: DAO_LIST,
})
export class DatabaseModule {
  constructor(
    private readonly userDao: UserDao,
    private readonly connection: Connection,
  ) {
  }
}
