import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentMetadataService {
  constructor(private prismaService: PrismaService) {}

  async getDocumentMetadataById(id: number) {
    return this.prismaService.documentMetadata.findUnique({
      where: {
        id,
      }
    })
  }

  async getDocumentList() {
    return this.prismaService.documentMetadata.findMany()
  }

  async createDocumentMetadata(data: Prisma.DocumentMetadataCreateInput) {
    return this.prismaService.documentMetadata.create({ data })
  }
}
