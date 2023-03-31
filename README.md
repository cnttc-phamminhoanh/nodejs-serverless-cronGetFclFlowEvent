
# Serverless Framework Node Scheduled Cron on AWS

## Descriptions

- Database used: postgres
- Crons will run every 1 minutes for get events and send to webhook
- Url webhook local: <http://localhost:3001/api/marketplace/graffle>

## Set up

- Create a file: `.env` in the root directory, same as the file `.envExample`

- Config the fields at the bottom #DATABASE.

- Install packages:

```pseudo
npm install
```

## Run project

- Run in local:

```pseudo
serverless offline
```
