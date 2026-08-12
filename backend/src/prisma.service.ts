import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    // TS workaround for 'beforeExit' event
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    (this.$on as any)('beforeExit', async () => {
      await app.close();
    });
  }
}
