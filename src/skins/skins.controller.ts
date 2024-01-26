import { CacheTTL, Controller, Get } from '@nestjs/common';
import { SkinsService } from './skins.service';
import { SkinDTO } from './dto/skin.dto';

@Controller('skins')
export class SkinsController {
  constructor(private skinsService: SkinsService) {}

  @Get('')
  @CacheTTL(60)
  async getSkins(): Promise<SkinDTO[]> {
    const res = await this.skinsService.fetchAndSaveItems();
    return res;
  }
}
