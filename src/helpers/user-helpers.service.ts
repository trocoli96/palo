import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Repository } from 'typeorm';
import { UserHelper } from './entities/user-helper.entity';

@Injectable()
export class UserHelperService extends TypeOrmCrudService<UserHelper> {
  constructor(@InjectRepository(UserHelper) repo: Repository<UserHelper>) {
    super(repo);
  }
}
