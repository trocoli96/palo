import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from '../../../data-source/entities/data-source.entity';
import { DataSourcesEnum } from '../../../data-source/data-sources.enum';

@Injectable()
export class DataSourceSeedService {
  private readonly logger = new Logger(DataSourceSeedService.name);

  constructor(
    @InjectRepository(DataSource)
    private repository: Repository<DataSource>,
  ) {}

  async run() {
    const dataSourceKeys = Object.keys(DataSourcesEnum).filter((key) =>
      isNaN(Number(key)),
    );

    for (const key of dataSourceKeys) {
      const id = DataSourcesEnum[key as keyof typeof DataSourcesEnum];

      // Check if the data source already exists
      const existingDataSource = await this.repository.findOneBy({ name: key });

      if (!existingDataSource) {
        // Create a new data source entity and save it
        const dataSource = new DataSource();
        dataSource.id = id; // Assuming the 'id' field is intended to store the enum numeric value
        dataSource.name = key;

        await this.repository.save(dataSource);
        this.logger.log(`Data source "${key}" has been seeded.`);
      } else {
        this.logger.log(`Data source "${key}" already exists.`);
      }
    }
  }
}
