/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// =========================
// FULL APIs FOR ALL TABLES (MVP AGENT READY)
// =========================

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/helper/prisma/prisma.service';

// NOTE: All APIs follow response format:
// { data, apiId, isSuccess }

// =========================
// COMMON RESPONSE
// =========================
export const success = (data: any, apiId: string) => ({
  data,
  apiId,
  isSuccess: true,
});

// =========================
// USERS MODULE
// =========================

// user.service.ts
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // create(data: any) {
  //   return this.prisma.user.create({ data });
  // }

  // findAll() {
  //   return this.prisma.user.findMany();
  // }
}
