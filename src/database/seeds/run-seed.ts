import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { TenantSeedService } from './tenant/tenant-seed.service';
import { LocalSeedService } from './local/local-seed.service';
import { DataSourceSeedService } from './data-source/data-source-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(LocalSeedService).run();
  await app.get(TenantSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(DataSourceSeedService).run();

  await app.close();
};

void runSeed();
