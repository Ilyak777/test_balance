import { Module } from '@nestjs/common';
import { SkinsController } from './skins.controller';
import { SkinsService } from './skins.service';
import { HttpModule } from '@nestjs/axios';
import { MyCacheModule } from './cache/myCache.module';
import { MyCacheService } from './cache/myCache.service';

@Module({
  imports: [MyCacheModule, HttpModule],
  controllers: [SkinsController],
  providers: [SkinsService, MyCacheService],
})
export class SkinsModule {}
