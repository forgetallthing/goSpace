import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../src/app.module';
import { MedalConfig } from '../src/schemas/medal-config.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const medalModel = app.get<Model<MedalConfig>>(getModelToken(MedalConfig.name));

  const seedData = [
    {
      medalKey: 'tiantan',
      name: '登上天坛',
      description: '向上攀登，抵达新的高度。',
      baseMeters: 100,
      unlockMeters: 100,
      starLevel: 1,
      sortOrder: 1,
      status: 'enabled',
    },
    {
      medalKey: 'tiantan',
      name: '登上天坛',
      description: '继续向上，稳步突破。',
      baseMeters: 100,
      unlockMeters: 200,
      starLevel: 2,
      sortOrder: 2,
      status: 'enabled',
    },
    {
      medalKey: 'tiantan',
      name: '登上天坛',
      description: '高阶收藏目标，持续积累。',
      baseMeters: 100,
      unlockMeters: 900,
      starLevel: 3,
      sortOrder: 3,
      status: 'enabled',
    },
  ];

  for (const item of seedData) {
    await medalModel.updateOne(
      { medalKey: item.medalKey, starLevel: item.starLevel },
      { $set: item },
      { upsert: true },
    ).exec();
  }

  await app.close();
}

void bootstrap();