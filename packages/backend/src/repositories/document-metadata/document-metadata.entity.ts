import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentMetadata, Prisma } from '@prisma/client';

@Injectable()
export class DocumentMetadataEntity {
  constructor(private prismaService: PrismaService) {}

  async getDocumentMetadataById(id: number) {
    return this.prismaService.documentMetadata.findUnique({
      where: {
        id,
      },
    });
  }

  async getDocumentListByOwnerId(ownerId: string) {
    return this.prismaService.documentMetadata.findMany({
      where: {
        ownerId,
      },
    });
  }

  async createDocumentMetadata(
    data: Prisma.DocumentMetadataCreateInput,
  ): Promise<DocumentMetadata> {
    return this.prismaService.documentMetadata.create({ data });
  }
}
