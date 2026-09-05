import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Environment variable DATABASE_URL is required');
}

const prisma = new PrismaClient({ datasourceUrl: databaseUrl });

const profileData: Prisma.ProfileCreateInput = {
  name: 'Андрей Македонский',
  description: 'Fullstack разработчик',
  links: {
    create: [
      {
        label: 'GitHub',
        url: 'https://github.com/andrey789-c',
      },
    ],
  },
  skills: {
    create: [
      { name: 'NestJS' },
      { name: 'Prisma' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'ExpressJS' },
      { name: 'GraphQL' },
      { name: 'Docker' },
    ],
  },
  experiences: {
    create: [
      {
        company: 'House',
        position: 'Fullstack Developer',
        period: '2023 — настоящее время',
        achievements: [
          'Разработка и развитие веб-приложений на Next.js, React, TypeScript и Node.js.',
          'Реализация серверной логики и API для взаимодействия frontend и backend.',
          'Интеграция REST API с использованием Axios, RTK Query и других инструментов работы с данными.',
          'Разработка авторизации, форм, каталогов и бизнес-логики с валидацией и обработкой ошибок.',
          'Оптимизация производительности веб-приложений: SSR/SSG, работа с данными, изображения и уменьшение времени загрузки страниц.',
          'Участие в проектировании архитектуры и рефакторинге существующего кода для повышения масштабируемости и поддерживаемости.',
          'Работа с Docker и CI/CD, подготовка приложений к сборке и деплою.',
        ],
      },
    ],
  },
  projects: {
    create: [
      {
        name: 'Instruments',
        link: 'https://github.com/andrey789-c/instruments/',
      },
      {
        name: 'Mebelstore',
        link: 'https://github.com/andrey789-c/mebelstore',
      },
      {
        name: 'DSK',
        link: 'http://5.42.120.37',
      },
    ],
  },
};

async function main(): Promise<void> {
  console.log('Starting database seed...');
  const existing = await prisma.profile.findFirst();
  if (existing) {
    console.log('Profile already exists, skipping seed.');
    return;
  }

  await prisma.profile.create({
    data: profileData,
  });

  console.log('Database seed completed.');
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
