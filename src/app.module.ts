import { Module } from '@nestjs/common';
import { SkinsModule } from './skins/skins.module';
import { MyCacheModule } from './skins/cache/myCache.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BalanceModule } from './balance/balance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './balance/user/user.module';
import { PaymentHistoryModule } from './balance/payment-history/payment-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'balance_test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SkinsModule,
    MyCacheModule,
    BalanceModule,
    UserModule,
    PaymentHistoryModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
