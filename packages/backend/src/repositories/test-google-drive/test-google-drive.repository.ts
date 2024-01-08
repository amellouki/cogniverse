import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repositories/prisma/prisma.service';

@Injectable()
export class TestGoogleDriveRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerEmail(email: string) {
    return this.prisma.testGoogleDrive.create({
      data: {
        email: email,
      },
    });
  }

  async approveEmail(email: string) {
    return this.prisma.testGoogleDrive.update({
      where: {
        email: email,
      },
      data: {
        approved: true,
      },
    });
  }
}
