import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from '../../../locales/entities/locales.entity';
import { LocalesEnum } from '../../../locales/locales.enum';

@Injectable()
export class LocalSeedService {
  constructor(
    @InjectRepository(Local)
    private repository: Repository<Local>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: LocalesEnum['en-EN'],
          code: 'en-EN',
        }),
        this.repository.create({
          id: LocalesEnum['es-ES'],
          code: 'es-ES',
        }),
      ]);
    }
  }
}
