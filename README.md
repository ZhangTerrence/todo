# Running

## Install dependencies

```sh
npm install
```

## Set up .env file

```sh
cp .env.example .env
```

## Update Prisma

```sh
npx prisma generate
```

## Run database

```sh
docker compose up --build -d
```

## Run database migration

```sh
npx prisma migrate dev --name tasks
```

## Run dev

```sh
npm run dev
```