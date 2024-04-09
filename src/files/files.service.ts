import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { In, Repository } from 'typeorm';
import { AllConfigType } from 'src/config/config.type';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { TenantService } from '../tenants/tenants.service';
import { UsersService } from '../users/users.service';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly tenantService: TenantService,
    private readonly userService: UsersService,
  ) {}

  private s3 = new S3Client({
    region: this.configService.get('file.awsS3Region', { infer: true }),
    credentials: {
      accessKeyId: this.configService.getOrThrow('file.accessKeyId', {
        infer: true,
      }),
      secretAccessKey: this.configService.getOrThrow('file.secretAccessKey', {
        infer: true,
      }),
    },
  });

  async getFileUrl(fileId: string): Promise<{ url: string }> {
    const file = await this.fileRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    // Delete from S3
    const bucket = this.configService.getOrThrow('file.awsDefaultS3Bucket', {
      infer: true,
    });
    const getObjectParams = {
      Bucket: bucket,
      Key: file.key,
    };

    const command = new GetObjectCommand(getObjectParams);

    return {
      url: await getSignedUrl(this.s3, command, { expiresIn: 3600 }), // 1 hour
    };
  }

  async uploadFile(
    file: Express.Multer.File | Express.MulterS3.File,
    userId: string,
    tenantId: string,
    metadata: {
      type?: string;
    },
  ): Promise<FileEntity> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      local: `/${this.configService.get('app.apiPrefix', { infer: true })}/v1/${
        file.path
      }`,
      s3: (file as Express.MulterS3.File).location,
      s3Key: (file as Express.MulterS3.File).key,
    };

    const user = await this.userService.findOne({ id: userId });
    const tenant = await this.tenantService.findOne({ id: tenantId });

    const fileCreated = this.fileRepository.create({
      path: path[this.configService.getOrThrow('file.driver', { infer: true })],
      tenant: tenant as Tenant,
      user: user as User,
      key: path.s3Key,
      url: path.s3,
      type: metadata?.type,
    });

    return this.fileRepository.save(fileCreated);
  }

  async deleteFile(fileId: string): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    // Delete from S3
    const bucket = this.configService.getOrThrow('file.awsDefaultS3Bucket', {
      infer: true,
    });
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: file.key,
    });
    await this.s3.send(command);

    // Delete from database
    await this.fileRepository.remove(file);
  }

  async findByIds(fileIds: string[]): Promise<FileEntity[]> {
    return await this.fileRepository.find({
      where: {
        id: In(fileIds),
      },
    });
  }
}
