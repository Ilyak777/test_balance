import { Global, Module } from '@nestjs/common';
import { MyCacheService } from './myCache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigService } from '@nestjs/config';

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
  controllers: [],
  exports: [CacheModule],
  providers: [MyCacheService],
})
export class MyCacheModule {}
