
FROM node:21.5
#docker build -t call .
#docker run -p 10031:10031 -i -t call

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY prod.env .env
#RUN npm run build

CMD [ "npm", "start" ]