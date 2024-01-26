import { Module } from '@nestjs/common';
import { SkinsController } from './skins.controller';
import { SkinsService } from './skins.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModuleX } from './cache/cache.module';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [CacheModuleX, HttpModule],
  controllers: [SkinsController],
  providers: [SkinsService, CacheService],
})
export class SkinsModule {}
