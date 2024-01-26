import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { nowString } from 'src/utils/dateNow';
import { CacheService } from './cache/cache.service';
import { SkinDTO } from './dto/skin.dto';

@Injectable()
export class SkinsService {
  constructor(
    private readonly http: HttpService,
    readonly cache: CacheService,
  ) {}

  async fetchAndSaveItems() {
    try {
      const checkCache = await this.cache.check();

      if (checkCache) {
        return checkCache;
      } else {
        const tradableItems: SkinDTO[] = await this.fetchItems(true);

        await this.cache.set(tradableItems);

        const nonTradableItems: SkinDTO[] = await this.fetchItems(false);

        return await this.cache.update(nonTradableItems);
      }
    } catch (error) {
      console.error(
        `Ошибка при получении списка айтемов в ${(nowString(), error)}`,
      );
    }
  }

  async fetchItems(tradable: boolean): Promise<SkinDTO[]> {
    const { data } = await this.http.axiosRef.get(
      `https://api.skinport.com/v1/items?app_id=730&currency=EUR&tradable=${tradable}`,
    );
    return data;
  }
}
