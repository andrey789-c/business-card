# Business Card API

Backend для страницы-визитки. API написан на NestJS и GraphQL, данные хранятся в PostgreSQL через Prisma.

## Что сделано

- добавлен GraphQL API с запросом `profile`;
- описана модель профиля: имя, описание, навыки, ссылки, опыт работы и проекты;
- подключены PostgreSQL и Prisma, добавлена миграция схемы;
- добавлен seed с тестовыми данными профиля;
- настроены Docker-окружения для разработки и production.

## Запуск в dev

Требования: Node.js 22+, npm 10+ и Docker.

```bash
cp .env.example .env
```

Заполните в `.env` переменные `POSTGRES_USER`, `POSTGRES_PASSWORD` и `POSTGRES_DB`. Для локального запуска `DATABASE_URL` должен указывать на `localhost`, например:

```env
DATABASE_URL=postgresql://useryou:postgres@localhost:5432/profile-test?schema=public
```

Установите зависимости и запустите API:

```bash
npm ci
npm run start:dev
```

Команда автоматически поднимет PostgreSQL, применит миграции и выполнит seed. GraphQL API доступен по адресу [http://localhost:3000/graphql](http://localhost:3000/graphql).

## Запуск в production

В production используется отдельный compose-файл. В `.env` должны быть заданы `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, а `DATABASE_URL` должен ссылаться на сервис `db`:

```env
POSTGRES_USER=useryou
POSTGRES_PASSWORD=postgres
POSTGRES_DB=profile-test
DATABASE_URL=postgresql://useryou:postgres@db:5432/profile-test?schema=public
```

Сборка образов и запуск:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

При старте production-контейнер применит миграции, выполнит seed и запустит собранное приложение на порту `3000`.

Остановка:

```bash
docker compose -f docker-compose.prod.yml down
```
