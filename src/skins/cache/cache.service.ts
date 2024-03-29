import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { nowString } from 'src/utils/dateNow';
import { SkinDTO } from '../dto/skin.dto';

enum filterForItems {
  tradable_items = 'TRADABLE_ITEMS',
  all_items = 'ALL_ITEMS',
}

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(items_to_cache: SkinDTO[]) {
    try {
      await this.cacheManager.set(filterForItems.tradable_items, {
        items: items_to_cache,
      });
      console.log(
        `Айтемы сохранились в кеш с пометкой tradable в ${nowString()}`,
      );
    } catch (error) {
      console.error(
        `Ошибка при сохранении tradable айтемов в ${(nowString(), error)}`,
      );
    }
  }

  async update(items_to_cache: SkinDTO[]) {
    try {
      const currentCache: {
        items: SkinDTO[];
      } = await this.cacheManager.get(filterForItems.tradable_items);

      const itemMap = new Map(
        currentCache.items.map((item) => [item.market_hash_name, item]),
      );

      const updatedItems = items_to_cache.map((item) => {
        const existingItem = itemMap.get(item.market_hash_name);

        if (existingItem) {
          item.min_price_non_tradable = item.min_price;
          item.min_price = existingItem.min_price;
        }

        return item;
      });

      await this.cacheManager.set(filterForItems.all_items, {
        items: updatedItems,
      });
      console.log(`Айтемы сохранились в кеш с пометкой all в ${nowString()}`);
      let { items } = await this.cacheManager.get(filterForItems.all_items);
      return items;
    } catch (error) {
      console.log(`Ошибка при обновлении кеша в ${(nowString(), error)}`);
    }
  }

  async check() {
    try {
      let items = await this.cacheManager.get(filterForItems.all_items);
      return items ? { items } : false;
    } catch (error) {
      console.log(`${error} при проверке кеша в ${nowString()}`);
    }
  }

  async del() {
    try {
      if (await this.check()) {
        await this.cacheManager.del(filterForItems.all_items);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`${error} при удалении кеша в ${nowString()}`);
    }
  }
}
