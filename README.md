
# Serverless Framework Node Scheduled Cron on AWS

## Descriptions

- Database used: postgres
- Crons will run every 1 minutes for get events and send to webhook
- Url webhook local: <http://localhost:3001/api/marketplace/graffle>

## Set up

- Create new database in postgres: `AFL-lambda-DB`

- Open database.js file and change config fields: database: `AFL-lambda-DB`, password: `<your_password>`.

- Install packages:

```pseudo
npm install
```

- Create table: `afl_events`:

```pseudo
cd ./src/migrations
```

```pseudo
node createEventCursorTable.js
```

## Run project

- Access root foder:

```pseudo
cd ../../
```

- Run in local:

```pseudo
serverless offline
```
