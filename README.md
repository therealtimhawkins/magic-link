<h1 align="center">🧙‍♂️ magic-link</h1>
<p align="center">Passwordless authentication using a magic link</p>

## Installation

- You'll need to head to `http://travistidwell.com/jsencrypt/demo/` to create a key pair. I recommend using 512 bit for jwt auth
- Copy these into a pair of files named `private.key` and `public.key`

1. Docker
- `cp .env.example .env` - then fill in your mailgun details in the new .env file
- `docker-compose up` - this will build the container and database required
- The database runs on port `3307` locally to keep from interfering with any database you have running
- The api is available on `PORT=4001`

2. Local
- Create a sql database
- `cp .env.example .env` - you'll need to change the database details to your own
- `npm install`
- `npm run knex:latest` - this will create the tables needed in you db
- `npm run dev` - this will start the dev serve on `PORT=4001`


### To do

- [ ] Choice of email provider
- [ ] Sms link
- [ ] Terraform infrastructure
