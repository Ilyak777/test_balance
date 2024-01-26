import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private cacheService: CacheService) {}

  @Get('del')
  async deleteCache(): Promise<{ message: string }> {
    const result = await this.cacheService.del();
    return result ? { message: 'Кеш удален' } : { message: 'Нет кеша' };
  }
}
