
# Serverless Framework Node Scheduled Cron on AWS

## Descriptions

- Database used: postgres
- Crons will run every 1 minutes

## Set up

- Open database.js file and change config fields: database, password.

- Install packages:

```pseudo
npm install
```

- Create table: "afl_events":

```pseudo
cd ./src/migrations
```

```pseudo
node createAFLEventsTable.js
```

## Run project event type

- Access root foder:

```pseudo
cd ../../
```

- Run in local:

```pseudo
serverless offline
```
