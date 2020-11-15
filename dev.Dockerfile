FROM mhart/alpine-node:12

WORKDIR /app/

RUN apk add jq curl xdg-utils

COPY package*.json ./
RUN yarn global add ngrok
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 4040

CMD ["npm", "run", "dev:docker"]
