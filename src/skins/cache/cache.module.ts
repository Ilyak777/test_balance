import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigService } from '@nestjs/config';
import { CacheController } from './cache.controller';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [CacheController],
  exports: [CacheModule],
  providers: [CacheService],
})
export class CacheModuleX {}
